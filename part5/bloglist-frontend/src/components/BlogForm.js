import blogService from "../services/blogs";
import React, { useState } from 'react'
import Togglable from "./Togglable";

const BlogForm = ({
                    setErrorMessage,
                    blogs,
                    setBlogs
                  }) => {

    const [newTitle, setNewTitle] = useState('')
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

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
            <Togglable buttonLabel='new note'>
                {blogForm()}
            </Togglable>
        </div>
    )
}

export default BlogForm