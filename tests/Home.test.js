import { cleanup, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Home from '../pages/index'

beforeEach(() => render(<Home />))
afterAll(() => cleanup())

test('render new record component when submit valid form data', async () => {
	const usernameField = screen.getByPlaceholderText('Jane')
	const paidField = screen.getByPlaceholderText('33.1')
	userEvent.type(usernameField, 'Henry')
	userEvent.type(paidField, '67')
	userEvent.click(screen.getByRole('button'))
	expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('$67')
	expect(usernameField).toHaveValue('')
	expect(paidField).toHaveValue('')
})
