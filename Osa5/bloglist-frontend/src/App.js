import { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage({text:'wrong username or password', type:'error'})
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    const blog = await blogService.create({
      title: title,
      author: author,
      url: url,
    })
    setBlogs(blogs.concat(blog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setNotificationMessage({text: `a new blog ${title} by ${author} added`, type: 'notification'})
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  if (user === null) {
    return(
      <div>
        <h2>Log in to application</h2>
        <Notification message={notificationMessage} type/>
        <LoginForm username={username} password={password} handleLogin={handleLogin} setPassword={setPassword} setUsername={setUsername} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type />
      <p>
        {user.name} logged-in <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      <BlogForm
        title={title}
        author={author}
        url={url}
        handleCreate={handleCreate}
        setAuthor={setAuthor}
        setTitle={setTitle}
        setUrl={setUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
    </div>
  )
}

export default App
