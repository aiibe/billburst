import Header from "../components/Header"
import Top from "../components/Top"
import Form from "../components/Form"
import Record from "../components/Record"
import { useState, useMemo } from "react"

export default function Home() {
  const [currency, setCurrency] = useState("$")
  const [record, setrecord] = useState([])
  const derivedRecord = useMemo(() => getDerivedRecords(record), [record])

  function getDerivedRecords(record) {
    return record.reduce((acc, { name, paid }) => {
      if (acc.length === 0) {
        acc.push({ name, records: [paid] })
      } else {
        const members = [...new Set(acc.map(a => a.name))]
        if (!members.includes(name)) {
          acc.push({ name, records: [paid] })
        } else {
          const slot = acc.findIndex(s => s.name === name)
          const newItem = {
            ...acc[slot],
            records: [...acc[slot].records, paid],
          }
          acc[slot] = newItem
        }
      }
      return acc
    }, [])
  }

  // const getMembers = () => {
  //   const members = [...new Set(record.map(r => r.name))] // ["alice", "paul"]
  //   return members
  // }

  const handleSubmit = ({ name, paid }) => {
    const rgx = new RegExp("^-?\\d*(\\.\\d+)?$") // Only integers and floats (comma is falsy)
    const id = Math.random().toString(36).substring(7) // Generate random short string
    if (!rgx.test(paid)) paid = 0
    setrecord([
      ...record,
      { name: name.toLowerCase().trim(), paid: parseFloat(paid), id },
    ])
  }

  // Find and remove record by target name and amount paid
  const removeRecord = ({ name, paid }) => {
    const foundIndex = record.findIndex(r => r.paid === paid && r.name === name)
    if (foundIndex > -1) {
      setrecord(record.filter((r, ix) => ix !== foundIndex))
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <Header />

      <Top record={record} currency={currency} />

      {derivedRecord.map(({ name, records }) => (
        <div
          key={name}
          className="bg-white border overflow-hidden mb-4 rounded-lg transition-opacity duration-700 ease-in-out"
        >
          <div className="px-3 py-3">
            <div className="flex justify-between items-center">
              <div className="flex">
                <div className="flex-shrink-0 h-12 w-12 mr-3">
                  <img
                    className="block rounded-full mr-4"
                    src={`https://api.multiavatar.com/${name}.png`}
                    alt={name}
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold capitalize">{name}</h3>
                  <ul>
                    {records.map(paid => (
                      <Record
                        key={name + paid}
                        name={name}
                        paid={paid}
                        currency={currency}
                        onRemove={removeRecord}
                      />
                    ))}
                  </ul>
                </div>
              </div>
              <h2 className="text-2xl font-bold">
                <span className="text-sm mr-1 align-top">$</span>
                {!records.length
                  ? 0
                  : records.reduce((t, paid) => (t += paid), 0)}
              </h2>
            </div>
          </div>
        </div>
      ))}

      <Form onSubmit={handleSubmit} />
    </div>
  )
}
