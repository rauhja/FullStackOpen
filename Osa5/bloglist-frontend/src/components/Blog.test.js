import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import Blog from "./Blog";
import userEvent from '@testing-library/user-event'

describe("<Blog /> tests", () => {
    test("renders title and author but not url or likes by default", () => {
        const blog = {
            title: "Testing",
            author: "Arthur",
            url: "http://www.google.com",
            likes: 0,
            user: {
                username: "root",
                name: "superuser"
            }
        }
        const mockUpdateLikes = jest.fn()
        const mockDeleteBlog = jest.fn()

        const component = render(
            <Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog}/>
        )
        expect(component.container).toHaveTextContent(blog.title)
        expect(component.container).toHaveTextContent(blog.author)
        expect(component.container).not.toHaveTextContent(blog.likes)
        expect(component.container).not.toHaveTextContent(blog.url)
    })

    test("renders blog all details when button is clicked", async () => {
        const blog = {
            title: "Testing",
            author: "Arthur",
            url: "http://www.google.com",
            likes: 0,
            user: {
                username: "root",
                name: "superuser"
            }
        }
        const mockUpdateLikes = jest.fn()
        const mockDeleteBlog = jest.fn()

        const component = render(
            <Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog}/>
        )

        const user = userEvent.setup()
        const button = screen.getByText('view')
        await user.click(button)

        expect(component.container).toHaveTextContent(blog.likes)
        expect(component.container).toHaveTextContent(blog.url)
    })

    test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
        const blog = {
            title: "Testing",
            author: "Arthur",
            url: "http://www.google.com",
            likes: 0,
            user: {
                username: "root",
                name: "superuser"
            }
        }
        const mockUpdateLikes = jest.fn()
        const mockDeleteBlog = jest.fn()

        render(
            <Blog blog={blog} updateLikes={mockUpdateLikes} deleteBlog={mockDeleteBlog}/>
        )

        const user = userEvent.setup()
        const viewButton = screen.getByText('view')
        await user.click(viewButton)

        const likeButton = screen.getByText('like')
        await user.click(likeButton)
        await user.click(likeButton)

        expect(mockUpdateLikes.mock.calls).toHaveLength(2)
    })
})