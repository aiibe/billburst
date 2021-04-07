import { render, cleanup, screen } from '@testing-library/react'
import Top from '../components/Top'

describe('Top component', () => {
	beforeEach(() => {
		render(<Top />)
	})

	afterEach(() => cleanup())

	it('display total spent 0', () => {
		const total = screen.getByRole('heading', { level: 1 })
		expect(total).toHaveTextContent('0')
	})
})
