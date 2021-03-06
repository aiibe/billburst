import Header from "../components/Header"
import Top from "../components/Top"
import Form from "../components/Form"
import Record from "../components/Record"
import Group from "../components/Group"
import Settle from "../components/Settle"
import { useState, useMemo } from "react"
import { randString } from "utils"

export default function Home() {
  const [currency, setCurrency] = useState("$")
  const [record, setrecord] = useState([])
  const derivedRecord = useMemo(() => getDerivedRecords(), [record])
  const totalSpent = getTotalSpent()

  function getDerivedRecords() {
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

  function getTotalSpent() {
    return !record.length ? 0 : record.reduce((t, r) => (t += r.paid), 0)
  }

  // User Events
  const handleSubmit = ({ name, paid }) => {
    const rgx = new RegExp("^-?\\d*(\\.\\d+)?$") // Only integers and floats (comma is falsy)
    if (!rgx.test(paid) || paid <= 0) return
    setrecord([
      ...record,
      {
        name: name.toLowerCase().trim(),
        paid: parseFloat(paid),
        id: randString(),
      },
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

      <div className="text-center text-gray-500 my-6">
        <p className="font-bold text-2xl">Quickly split your bill.</p>
        <p className="text-base">No login required. No data sent.</p>
      </div>

      <Top total={totalSpent} currency={currency} />

      {derivedRecord.map(({ name, records }) => (
        <Group key={name} name={name} records={records}>
          <ul>
            {records.map((paid, idx) => (
              <Record
                key={name + idx}
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

      <Settle
        totalSpent={totalSpent}
        derivedRecord={derivedRecord}
        clearAll={() => setrecord([])}
      />
    </div>
  )
}
