import blogService from "../services/blogs";
import React, { useState } from 'react'


const BlogForm = ({
                    setErrorMessage,
                    newAuthor,
                    setNewAuthor,
                    newTitle,
                    setNewTitle,
                    newUrl,
                    setNewUrl,
                    blogs,
                    setBlogs
                  }) => {

    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const handleTitle = (event) => {
        setNewTitle(event.target.value)
    }
    const handleAuthor = (event) => {
        setNewAuthor(event.target.value)
    }
    const handleUrl = (event) => {
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
                setVisible(false)
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

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => setVisible(true)}>new note</button>
            </div>
            <div style={showWhenVisible}>
                {blogForm()}
                <button onClick={() => setVisible(false)}>cancel</button>
            </div>
        </div>
    )
}

export default BlogForm