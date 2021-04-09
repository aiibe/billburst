export default function Top({ record = [], currency = "$" }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-2xl font-medium text-gray-900 font-bold">
          Total spent
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Let's burst the bill !
        </p>
      </div>
      <div>
        <h1 className="text-4xl font-bold">
          <span className="text-lg mr-1 align-top">{currency}</span>
          {!record.length ? 0 : record.reduce((t, r) => (t += r.paid), 0)}
        </h1>
      </div>
    </div>
  )
}
