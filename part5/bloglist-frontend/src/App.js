import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        setErrorMessage('We\'re sorry you\'re leaving')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

  if (user === null) {
    return (
        <div>
            <LoginForm
                username={username}
                password={password}
                setUser={setUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                setUsername={setUsername}
                setPassword={setPassword} />
        </div>
    )
  }

  return (
    <div>
        <Notification message={errorMessage} />

        <h2>blogs</h2>
        <p>{user.name} logged in
            <button type={"button"} onClick={logout}>logout</button>
        </p>

        <BlogForm
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newAuthor={newAuthor}
            setNewAuthor={setNewAuthor}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
        />

        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App