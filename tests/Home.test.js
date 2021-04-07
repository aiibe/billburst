import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../pages/index'

function userSubmitValidForm() {
	const inputUsername = screen.getByPlaceholderText('Jane')
	const inputPaid = screen.getByPlaceholderText('33.1')
	const button = screen.getByRole('button')
	userEvent.type(inputUsername, 'Lee')
	userEvent.type(inputPaid, '3')
	userEvent.click(button)
}

function userSubmitInvalidForm() {
	const inputUsername = screen.getByPlaceholderText('Jane')
	const inputPaid = screen.getByPlaceholderText('33.1')
	const button = screen.getByRole('button')
	userEvent.type(inputUsername, 'Lee')
	userEvent.type(inputPaid, '3*')
	userEvent.click(button)
}

describe('Home', () => {
	beforeEach(() => {
		render(<Home />)
	})

	afterAll(() => cleanup())

	it('render button Add Expense', () => {
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	it('onchange username input works', () => {
		const inputUsername = screen.getByPlaceholderText('Jane')
		userEvent.type(inputUsername, 'Henry')
		expect(inputUsername).toHaveValue('Henry')
	})

	it('onchange paid input works', () => {
		const inputPaid = screen.getByPlaceholderText('33.1')
		userEvent.type(inputPaid, '45.0')
		expect(inputPaid).toHaveValue('45.0')
	})

	it('sum total spent', () => {
		const total = screen.getByRole('heading', { level: 1 })
		const inputUsername = screen.getByPlaceholderText('Jane')
		const inputPaid = screen.getByPlaceholderText('33.1')
		const button = screen.getByRole('button')
		userEvent.type(inputUsername, 'Lee')
		userEvent.type(inputPaid, '3')
		userEvent.click(button)
		expect(total).toHaveTextContent('3')
	})

	it('render new record component after submit valid form', () => {
		userSubmitValidForm()
		const username = screen.getAllByRole('heading', { level: 3 })[1]
		expect(username).toHaveTextContent('lee')
	})

	it('render new record component with 0 after invalid form submission', () => {
		userSubmitInvalidForm()
		const paid = screen.getByRole('heading', { level: 2 })
		expect(paid).toHaveTextContent('0')
	})
})
