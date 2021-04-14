import { motion } from "framer-motion"

export default function Settle({ derivedRecord, record, totalSpent }) {
    const totalMembers = derivedRecord.length
    const averageCost = parseFloat(totalSpent/totalMembers).toFixed(2)
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
            <div className="flex justify-between items-center mb-2">
              <div className="flex justify-between items-center">
                <img
                  className="block rounded-full mr-4 h-12 w-12"
                  src={`https://api.multiavatar.com/kim.png`}
                  alt=""
                />
                <span className="text-base font-bold capitalize">Kim</span>
              </div>
              <span>→</span>
              <span className="font-bold text-lg">$68</span>
              <span>→</span>
              <div className="flex justify-between items-center">
                <span className="text-base font-bold capitalize">Alex</span>
                <img
                  className="block rounded-full ml-4 h-12 w-12"
                  src={`https://api.multiavatar.com/alex.png`}
                  alt=""
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
