import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../pages/index'

describe('Home', () => {
	beforeEach(() => {
		render(<Home />)
	})

	afterEach(() => cleanup())

	it('render button Add Expense', () => {
		expect(screen.getByRole('button')).toBeInTheDocument()
	})

	// it('render username input', () => {
	// 	expect(screen.getByPlaceholderText('Jane')).toBeInTheDocument()
	// })

	// it('render paid input', () => {
	// 	expect(screen.getByPlaceholderText('33.1')).toBeInTheDocument()
	// })

	// it('username input has value of Henry', () => {
	// 	const inputUsername = screen.getByPlaceholderText('Jane')
	// 	userEvent.type(inputUsername, 'Henry')
	// 	expect(inputUsername).toHaveValue('Henry')
	// })

	// it('paid input has value of 45.0', () => {
	// 	const inputPaid = screen.getByPlaceholderText('33.1')
	// 	userEvent.type(inputPaid, '45.0')
	// 	expect(inputPaid).toHaveValue('45.0')
	// })

	it('display total spent 3', () => {
		const total = screen.getByRole('heading', { level: 1 })
		const inputUsername = screen.getByPlaceholderText('Jane')
		const inputPaid = screen.getByPlaceholderText('33.1')
		const button = screen.getByRole('button')
		userEvent.type(inputUsername, 'Lee')
		userEvent.type(inputPaid, '3')
		userEvent.click(button)
		expect(total).toHaveTextContent('3')
	})

	it('render new record component after submit complete form', () => {
		const inputUsername = screen.getByPlaceholderText('Jane')
		const inputPaid = screen.getByPlaceholderText('33.1')
		const button = screen.getByRole('button')
		userEvent.type(inputUsername, 'Lee')
		userEvent.type(inputPaid, '3')
		userEvent.click(button)
		const username = screen.getAllByRole('heading', { level: 3 })[1]
		expect(username).toHaveTextContent('lee')
	})
})
