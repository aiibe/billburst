export default function Group({ name, records, children }) {
  return (
    <div className="bg-white border overflow-hidden mb-4 rounded-lg">
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
              <ul>{children}</ul>
            </div>
          </div>
          <h2 className="text-2xl font-bold">
            <span className="text-sm mr-1 align-top">$</span>
            {!records.length ? 0 : records.reduce((t, paid) => (t += paid), 0)}
          </h2>
        </div>
      </div>
    </div>
  )
}
