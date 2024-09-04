const { GraphQLError } = require("graphql");
const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Book = require("./models/book");
const Author = require("./models/author");

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filter = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) {
          filter.author = author._id;
        }
      }
      if (args.genre) {
        filter.genres = { $in: [args.genre] };
      }
      return await Book.find(filter).populate("author");
    },
    allAuthors: async () => await Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser;
    },
    allGenres: async () => {
      const books = await Book.find({});
      return Array.from(new Set(books.flatMap((book) => book.genres)));
    },
  },
  Author: {
    bookCount: async (root) => {
      return await Book.countDocuments({ author: root._id });
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let author = await Author.findOne({ name: args.author });
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          if (error.name === "ValidationError") {
            throw new GraphQLError(
              "Authors name must be at least 4 characters long",
              {
                extensions: {
                  code: "GRAPHQL_VALIDATION_FAILED",
                  invalidArgs: args.author,
                  error,
                },
              }
            );
          } else {
            throw new GraphQLError("Saving author failed", {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            });
          }
        }
      }
      const book = new Book({ ...args, author: author._id });
      try {
        await book.save();
        pubsub.publish("BOOK_ADDED", { bookAdded: book.populate("author") });
        return book.populate("author");
      } catch (error) {
        if (error.name === "ValidationError") {
          throw new GraphQLError(
            "Title must be at least 5 characters long and unique",
            {
              extensions: {
                code: "GRAPHQL_VALIDATION_FAILED",
                invalidArgs: args.title,
                error,
              },
            }
          );
        } else if (error.code === 11000) {
          throw new GraphQLError("Title must be unique", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        } else {
          throw new GraphQLError("Saving book failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
              error,
            },
          });
        }
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo }
      );
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      if (!author) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });
      return await user.save().catch((error) => {
        throw new GraphQLError("Creating user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
    },
  },
};

module.exports = resolvers;
