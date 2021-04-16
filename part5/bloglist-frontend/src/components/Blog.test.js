import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from "./BlogForm"

describe('Blog tests', () => {
    const blog = {
        title: 'Test Blog',
        author: 'Dmitri Vlassenko',
        url: 'www.whatever.fi',
        likes: 5,
        user: {
            username: 'dvlassen',
            name: 'Dmitri Vlassenko',
            id: 'dvlassen',
        }
    }

    let component = null
    const mockHandler = jest.fn()

    beforeEach(() => {
        component = render(
            <Blog blog={blog} updateBlog={mockHandler} />
        )
    })

    test('renders title and author, but does not render its url or number of likes by default', () => {
        const div = component.container.querySelector('.blog')

        expect(div).toHaveTextContent(`${blog.title}`)
        expect(div).toHaveTextContent(`${blog.author}`)
        expect(div).not.toHaveTextContent(`likes ${blog.likes}`)
        expect(div).not.toHaveTextContent(`${blog.url}`)
    })

    test('url and number of likes are shown when the button has been clicked', () => {
        const button = component.getByText('view')
        fireEvent.click(button)

        const div = component.container.querySelector('.blog')
        expect(div).toHaveTextContent(`Likes ${blog.likes}`)
        expect(div).toHaveTextContent(`${blog.url}`)
    })

    test('if the like button is clicked twice, the event handler the component received as props is called twice.', () => {
        const button = component.getByText('view')
        fireEvent.click(button)
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

test('BlogForm test', () => {
    const createBlog = jest.fn()

    const component = render(
        <BlogForm createNote={createNote} />
    )

    const input = component.container.querySelector('input')
    const form = component.container.querySelector('form')

    fireEvent.change(input, {
        target: { value: 'testing of forms could be easier' }
    })
    fireEvent.submit(form)

    expect(createNote.mock.calls).toHaveLength(1)
    expect(createNote.mock.calls[0][0].content).toBe('testing of forms could be easier' )
})
