import React from "react";
import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm";
import userEvent from '@testing-library/user-event'

describe('<BlogFrom /> tests', () => {
    test('if the form calls the event handler it received as props with the right details when a new blog is created', async ()=> {
        const handleNewBlog = jest.fn()
        const user = userEvent.setup()

        const {container} = render(<BlogForm createBlog={handleNewBlog} />)

        const inputTitle = container.querySelector("input[name='Title']")
        const inputAuthor = container.querySelector("input[name='Author']")
        const inputUrl = container.querySelector("input[name='Url']")
        const sendButton = screen.getByText('create')

        await user.type(inputTitle, "title")
        await user.type(inputAuthor, "author")
        await user.type(inputUrl, "https://www.google.com")
        await user.click(sendButton)

        expect(handleNewBlog.mock.calls).toHaveLength(1)
        expect(handleNewBlog.mock.calls[0][0].title).toBe('title')
        expect(handleNewBlog.mock.calls[0][0].author).toBe('author')
        expect(handleNewBlog.mock.calls[0][0].url).toBe('https://www.google.com')
    })
})