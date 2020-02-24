import React from "react"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import Blog from "../components/Blog"

test("<Blog /> show relevant data", () => {

	const blog = {
		title: "hi!",
		author: "my name is",
		likes: 999,
		url: "uuuuuuuurrrrrrrrrllllllll"
	}

	const rendered = render(
		<Blog blog = {blog}/>
	)

	expect(rendered.container).toHaveTextContent("hi!")
	expect(rendered.container).toHaveTextContent("my name is")
})

test("Blog starts untoggled", () => {
	const blog = {
		title: "hi!",
		author: "my name is",
		likes: 999,
		url: "uuuuuuuurrrrrrrrrllllllll"
	}

	const rendered = render(
		<Blog blog = {blog}/>
	)
	const div = rendered.container.querySelector(".togglableContent")

	expect(div).toHaveStyle("display: none")
})

test("<Blog /> show url and likes after button press", async () => {
	const blog = {
		title: "hi!",
		author: "my name is",
		likes: 999,
		url: "uuuuuuuurrrrrrrrrllllllll"
	}

	const rendered = render(
		<Blog blog={blog} />
	)

	const button = rendered.getByText("show blog")
	fireEvent.click(button)

	const div = rendered.container.querySelector(".togglableContent")
	expect(div).not.toHaveStyle("display: none")
	expect(rendered.container).toHaveTextContent("hi!")
	expect(rendered.container).toHaveTextContent("my name is")
	expect(rendered.container).toHaveTextContent("999")
	expect(rendered.container).toHaveTextContent("uuuuuuuurrrrrrrrrllllllll")
})

test("Like button click fn is called on click", async () => {
	const blog = {
		title: "hi!",
		author: "my name is",
		likes: 999,
		url: "uuuuuuuurrrrrrrrrllllllll"
	}

	const mockHandler = jest.fn()
	const rendered = render(
		<Blog blog={blog} likeFn={mockHandler} />
	)

	fireEvent.click(rendered.getByText("like this"))

	expect(mockHandler.mock.calls.length).toBe(1)

	fireEvent.click(rendered.getByText("show blog"))

	expect(mockHandler.mock.calls.length).toBe(1)
})