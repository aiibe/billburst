import Head from 'next/head'

export default function Home() {
	return (
		<>
			<Head>
				<title>BillBurst</title>
			</Head>
			<div className='w-full max-w-2xl mx-auto'>
				<p className='bg-gray-300'>Hello World</p>
			</div>
		</>
	)
}
