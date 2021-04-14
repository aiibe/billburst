import Header from "../components/Header"
import Top from "../components/Top"
import Form from "../components/Form"
import Record from "../components/Record"
import Group from "../components/Group"
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
        <Group key={name} name={name} records={records}>
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
        </Group>
      ))}

      <Form onSubmit={handleSubmit} />
    </div>
  )
}
