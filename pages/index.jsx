import Header from '@/components/Header'
import { useState, useEffect } from 'react'

export default function Home() {
	const initialForm = Object.freeze({ name: '', paid: 0 })
	const [currency, setCurrency] = useState('$')
	const [name, setName] = useState('')
	const [hasPaid, setHasPaid] = useState('')
	const [record, setrecord] = useState([
		// { name: 'souk', paid: 45, id: 'sxiuG' },
		// { name: 'vira', paid: 88, id: 'kimsH' },
		// { name: 'souk', paid: 32, id: 'poyTy' },
	])

	const getDerivedRecords = () => {
		return record.reduce((acc, { name, paid }, idx) => {
			if (acc.length === 0) {
				acc.push({ name, records: [paid] })
			} else {
				const members = [...new Set(acc.map((a) => a.name))]
				if (!members.includes(name)) {
					acc.push({ name, records: [paid] })
				} else {
					const slot = acc.findIndex((s) => s.name === name)
					const newItem = { ...acc[slot], records: [...acc[slot].records, paid] }
					acc[slot] = newItem
				}
			}
			return acc
		}, [])

		// Output similar:
		// [
		// 	{
		// 		name: 'souk',
		// 		records: [45, 32],
		// 	},
		// 	{ name: 'vira', records: [88] },
		// ]
	}

	const getMembers = () => {
		const members = [...new Set(record.map((r) => r.name))] // ["alice", "paul"]
		// console.log('members', members)
		return members
	}

	const addExpense = () => {
		const newRecord = { name: 'alice', paid: 5, id: 'uskwY' }
		setrecord([...record, newRecord])
	}

	const handleSubmit = (event) => {
		event.preventDefault()
		const id = Math.random().toString(36).substring(7) // Generate random short string
		let paid = parseFloat(hasPaid)
		if (isNaN(paid)) paid = 0
		setrecord([...record, { name: name.toLowerCase(), paid, id }])
		setName('')
		setHasPaid('')
	}

	useEffect(() => {
		getMembers()
	}, [record])

	return (
		<div className='w-full max-w-2xl mx-auto px-4'>
			<Header />

			<div className='flex justify-between items-center mb-4'>
				<div>
					<h3 className='text-2xl font-medium text-gray-900 font-bold'>
						Total spent
					</h3>
					<p className='mt-1 max-w-2xl text-sm text-gray-500'>
						Let's burst the bill !
					</p>
				</div>
				<div>
					<h1 className='text-4xl font-bold'>
						<span className='text-lg mr-1 align-top'>{currency}</span>
						{record.reduce((t, r) => (t += r.paid), 0)}
					</h1>
				</div>
			</div>

			{getDerivedRecords().map(({ name, records }) => (
				<div
					className='bg-white shadow overflow-hidden mb-4 sm:rounded-lg'
					key={name}
				>
					<div className='px-3 py-3'>
						<div className='flex justify-between items-center'>
							<div className='flex'>
								<div className='flex-shrink-0 h-12 w-12 mr-3'>
									<img
										className='block rounded-full mr-4'
										src={`https://api.multiavatar.com/${name}.png`}
										alt={name}
									/>
								</div>
								<div>
									<h3 className='text-base font-bold capitalize'>{name}</h3>
									<ul>
										{records.map((paid) => (
											<li key={paid} className='text-sm text-gray-500'>
												→ paid {currency}
												{paid}
											</li>
										))}
									</ul>
								</div>
							</div>
							<h2 className='text-2xl font-bold'>
								<span className='text-sm mr-1 align-top'>$</span>
								{records.reduce((t, paid) => (t += paid), 0)}
							</h2>
						</div>
					</div>
				</div>
			))}

			<div className='pb-4'></div>

			<form onSubmit={handleSubmit}>
				<div className='flex mb-2'>
					<div className='w-1/2 mr-2'>
						<label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
							Name
						</label>
						<input
							onChange={(event) => setName(event.target.value)}
							className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-2 px-2 mb-3'
							type='text'
							placeholder='Jane'
							value={name}
						/>
					</div>
					<div className='w-1/2 ml-2'>
						<label className='block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2'>
							$$$
						</label>
						<input
							onChange={(event) => setHasPaid(event.target.value)}
							className='appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-2'
							type='text'
							placeholder='33.1'
							value={hasPaid}
						/>
					</div>
				</div>
				<button
					type='submit'
					className='mb-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700'
				>
					Add Expense
				</button>
			</form>
		</div>
	)
}
