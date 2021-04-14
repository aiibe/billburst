export default function Top({ total=0, currency = "$" }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <h3 className="text-2xl text-gray-900 font-bold">
          Total Spent
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Add your expenses to begin
        </p>
      </div>
      <div>
        <h1 className="text-4xl font-bold">
          <span className="text-lg mr-1 align-top">{currency}</span>
          {total}
        </h1>
      </div>
    </div>
  )
}
