import { motion } from "framer-motion"
import { randString } from "utils"

export default function Settle({ derivedRecord, record, totalSpent }) {
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
    // console.log(members)
    let allSteps = []
    if (members.length) {
      for (let i = 0; i < owees.length; i++) {
        for (let j = 0; j < lenders.length; j++) {
          if (lenders[j].lend > 0) {
            const sub = (lenders[j].lend - owees[i].owe).toFixed(2)
            allSteps = [
              [
                owees[i].name,
                sub > 0 ? owees[i].owe : lenders[j].lend,
                lenders[j].name,
              ],
              ...allSteps,
            ]
            //   console.log([owees[i].name, (sub > 0 ? owees[i].owe : lenders[j].lend), lenders[j].name ]);
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

    // console.log(allSteps)

    return allSteps
  }

  function owe(member) {
    const spent = member.records.reduce((t, rec) => (t += rec), 0)
    return (spent - averageCost).toFixed(2)
  }

  return (
    <motion.div layout className="mb-8">
      {derivedRecord.length > 1 && (
        <motion.div>
          <div className="mb-4">
            <h2 className="font-bold mb-2 text-2xl">Settle Up</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Follow steps to settle up
            </p>
            <p>Each person average cost : {averageCost}</p>
          </div>
          <div className="px-3 py-3 bg-green-400 mb-4 rounded-lg text-white">
            {steps.map(m => (
              <div
                key={randString()}
                className="flex justify-between items-center mb-2"
              >
                <div className="flex justify-between items-center">
                  <img
                    className="block rounded-full mr-4 h-12 w-12"
                    src={`https://api.multiavatar.com/${m[0]}.png`}
                    alt=""
                  />
                  <span className="text-base font-bold capitalize">{m[0]}</span>
                </div>
                <span>→</span>
                <span className="font-bold text-lg">${m[1]}</span>
                <span>→</span>
                <div className="flex justify-between items-center">
                  <span className="text-base font-bold capitalize">{m[2]}</span>
                  <img
                    className="block rounded-full ml-4 h-12 w-12"
                    src={`https://api.multiavatar.com/${m[2]}.png`}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
