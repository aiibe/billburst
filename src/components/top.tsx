type Props = { total: number; currency: string };

export default function Top(props: Props) {
  const { total = 0, currency = "$" } = props;

  return (
    <div className="flex justify-between mb-4 items-baseline">
      <h3 className="text-2xl text-gray-900 font-bold">Total Spent</h3>
      <div>
        <h1 className="text-4xl font-bold">
          <span className="text-lg mr-1">{currency}</span>
          {total.toFixed(2)}
        </h1>
      </div>
    </div>
  );
}
