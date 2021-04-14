import { motion } from "framer-motion"
import { randString } from "utils"

export default function Settle({ derivedRecord, clearAll, totalSpent }) {
  const totalMembers = derivedRecord.length
  const averageCost = parseFloat(totalSpent / totalMembers).toFixed(2)
  const steps = getSteps()

  function getSteps() {
    const members = derivedRecord.map(m => {
      const num = owe(m)
      if (num < 0) return { ...m, owe: Math.abs(num) }
      return { ...m, lend: Math.abs(num) }
    })
    const owees = members.filter(m => m.owe)
    const lenders = members.filter(m => m.lend)

    // Inevitable mutation
    let allSteps = []
    if (members.length) {
      for (let i = 0; i < owees.length; i++) {
        for (let j = 0; j < lenders.length; j++) {
          if (lenders[j].lend > 0) {
            const sub = (lenders[j].lend - owees[i].owe).toFixed(2)
            const newStep = [
              owees[i].name,
              sub > 0 ? owees[i].owe : lenders[j].lend,
              lenders[j].name,
            ]
            allSteps.push(newStep)
            lenders[j].lend = Math.abs(sub)
            if (sub >= 0) {
              owees[i].owe = 0
              break
            } else {
              owees[i].owe = Math.abs(sub)
              lenders[j].lend = 0
            }
          }
        }
      }
    }
    return allSteps
  }

  function owe(member) {
    const spent = member.records.reduce((t, rec) => (t += rec), 0)
    return (spent - averageCost).toFixed(2)
  }

  return (
    <motion.div layout className="mb-8">
      {derivedRecord.length > 1 && (
        <div>
          <div className="mb-4 text-center">
            <h2 className="font-bold mb-2 text-2xl">How To Settle Up</h2>
            <p className="mt-1 max-w-2xl text-gray-500">
              Follow steps to settle up
            </p>
          </div>
          <div className="mb-4">
            {steps.map(m => (
              <div
                key={randString()}
                className="flex justify-between items-center border mb-2 p-3 bg-white rounded-lg"
              >
                <div className="flex flex-col items-center">
                  <img
                    className="block rounded-full h-12 w-12"
                    src={`https://api.multiavatar.com/${m[0]}.png`}
                    alt=""
                  />
                  <span className="font-bold capitalize">{m[0]}</span>
                </div>
                <span>→</span>
                <span className="font-bold text-xl text-center text-green-600">${m[1]}</span>
                <span>→</span>
                <div className="flex flex-col items-center">
                  <img
                    className="block rounded-full h-12 w-12"
                    src={`https://api.multiavatar.com/${m[2]}.png`}
                    alt=""
                  />
                  <span className="font-bold capitalize">{m[2]}</span>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => clearAll()} className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-400 hover:bg-gray-500">
            Clear All
          </button>
        </div>
      )}
    </motion.div>
  )
}
