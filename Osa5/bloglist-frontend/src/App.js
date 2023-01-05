import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggerdUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggerdUserJSON) {
      const user = JSON.parse(loggerdUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotificationMessage({ text:'wrong username or password', type:'error' })
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = async (title, author, url) => {
    blogFormRef.current.toggleVisibility()
    const blog = await blogService.create(title, author, url)
    setBlogs(blogs.concat(blog))
    setNotificationMessage({ text: `a new blog ${title} by ${author} added`, type: 'notification' })
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const updateLikes = async (id, updateBlog) => {
    const updatedBlog = await blogService.update(id, updateBlog)
    setBlogs((blogs.map((blog) => blog.id === id ? { ...blog, likes: updatedBlog.likes } : blog)))
  }

  const deleteBlog = async (blog) => {
    await blogService.remove(blog.id)
    setBlogs((blogs.filter(b => b.id !== blog.id)))
  }

  const blogFormRef = useRef()

  return (
    <div>
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <Notification message={notificationMessage} />
          <LoginForm handleLogin={handleLogin} />
        </div> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs
            .sort((a,b) => b.likes - a.likes)
            .map((blog) =>
              <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
            )}
        </div>
      }
    </div>
  )
}

export default App
