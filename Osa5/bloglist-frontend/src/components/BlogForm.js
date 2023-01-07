import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <div>
      <h2>create new</h2>

      <form onSubmit={handleCreate}>
        <div>
                    title:
          <input
            id='title'
            type="title"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
                    author:
          <input
            id='author'
            type="author"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
                    url:
          <input
            id='url'
            type="url"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button id='create-button' type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm