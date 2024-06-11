type Props = {
  total: number;
  currency: string;
};

export default function Total(props: Props) {
  const { total = 0, currency = "$" } = props;

  return (
    <div className="flex justify-between mt-6 items-baseline font-bold">
      <h3 className="text-2xl">Total Spent</h3>
      <h1 className="text-2xl">
        <span className="text-lg mr-1">{currency}</span>
        {total.toFixed(2)}
      </h1>
    </div>
  );
}
