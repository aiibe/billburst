type Props = {
  total: number;
  currency: string;
};

export default function Total(props: Props) {
  const { total = 0, currency = "$" } = props;

  return (
    <div className="flex justify-between mt-6 items-baseline font-bold">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Total Spent
      </h3>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        <span className="text-lg mr-1">{currency}</span>
        {total.toFixed(2)}
      </h3>
    </div>
  );
}
