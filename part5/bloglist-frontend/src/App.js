import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )
            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        setErrorMessage('We\'re sorry you\'re leaving')
        setTimeout(() => {
            setErrorMessage(null)
        }, 5000)
    }

    const handleTitle = (event) => {
        console.log(event.target.value)
        setNewTitle(event.target.value)
    }
    const handleAuthor = (event) => {
        console.log(event.target.value)
        setNewAuthor(event.target.value)
    }
    const handleUrl = (event) => {
        console.log(event.target.value)
        setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: newTitle,
            author: newAuthor,
            url: newUrl
        }
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNewAuthor('')
                setNewTitle('')
                setNewUrl('')
                setErrorMessage('Success')
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
            })
    }

    const blogForm = () => (
        <form onSubmit={addBlog}>
            title: <input
                value={newTitle}
                onChange={handleTitle}
            /><br/>
            author: <input
                value={newAuthor}
                onChange={handleAuthor}
            /><br/>
            url: <input
                value={newUrl}
                onChange={handleUrl}
            /><br/>
            <button type="submit">create</button>
        </form>
    )

  if (user === null) {
    return (
        <div>
            <Notification message={errorMessage} />
          <h2>Log in to application</h2>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
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
        <h3>Create new</h3>
        {blogForm()}
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App