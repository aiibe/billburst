import { useState } from "react"

export default function Form({ onSubmit }) {
  const initialState = Object.freeze({ name: "", paid: "" })
  const [state, setstate] = useState(initialState)

  function handleSubmit(event) {
    event.preventDefault()
    onSubmit(state)
    setstate(initialState)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex mb-2">
        <div className="w-1/2 mr-2 mb-3">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Name
          </label>
          <input
            required={true}
            onChange={event => setstate({ ...state, name: event.target.value })}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="Jane"
            value={state.name}
          />
        </div>
        <div className="w-1/2 ml-2">
          <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2">
            Amount
          </label>
          <input
            required={true}
            onChange={event => setstate({ ...state, paid: event.target.value })}
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-2 px-2 focus:outline-none focus:ring focus:border-blue-300"
            type="text"
            placeholder="33.1"
            value={state.paid}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mb-4 w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
      >
        Add Expense
      </button>
    </form>
  )
}
