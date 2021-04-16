import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [errorMessage])

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

    const updateBlog = async (blogParams) => {
        try {
            await blogService.update(blogParams)
            const updatedBlogs = blogs.map(blog => (blog.id === blogParams.id ? { ...blogParams } : blog))
            setBlogs(updatedBlogs)
        } catch (e) {
            setErrorMessage('unexpected error')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const removeBlog = async (blogId) => {
        try {
            await blogService.remove(blogId)
            const updatedBlogs = blogs.filter((blog) => (blog.id === blogId ? false : blog))
            setBlogs(updatedBlogs)
            setErrorMessage('deleted')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        } catch (e) {
            setErrorMessage('unable to delete')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
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
            blogs={blogs}
            setBlogs={setBlogs}
            setErrorMessage={setErrorMessage}
        />

        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} username={user.username} />
      )}
    </div>
  )
}

export default App