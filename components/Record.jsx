import {motion} from "framer-motion"

export default function Record({ paid, name, currency, onRemove }) {
  return (
    <li className="text-sm text-gray-500 mt-2">
      <motion.p layout> → paid {currency}
      {paid}
      <span
        className="text-xs ml-2 text-red-500 cursor-pointer"
        onClick={() => onRemove({ name, paid })}
      >
        remove
      </span>
      </motion.p>
    </li>
  )
}
