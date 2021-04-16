import React, { useRef } from 'react'
import Togglable from "./Togglable";

const Blog = ({blog, updateBlog, removeBlog, username}) => {
  const blogStyle = {
    padding: 10,
    border: '1px solid black',
    borderWidth: 1,
    margin: 3
  }
  const visibleRef = useRef()

  const likeBlog = () => {
    updateBlog({
      ...blog,
      likes: blog.likes + 1,
    })
  }

  const deleteBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) removeBlog(blog.id)
  }

  return (
        <div className={'blog'} style={blogStyle}>
          {blog.title} {blog.author}
          <Togglable buttonLabel="view" ref={visibleRef}>
            <p>{blog.url}</p>
            <p>Likes {blog.likes}
              <button onClick={likeBlog}>like</button>
            </p>
            {blog.user.username === username && (
                <button onClick={deleteBlog}>remove</button>)}
          </Togglable>
        </div>
  )
}

export default Blog