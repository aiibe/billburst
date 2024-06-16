"use client";

import { useState } from "react";
import Header from "@/components/header";
import Total from "@/components/total";
import Transaction from "@/components/transaction";
import Form, { FormState } from "@/components/form";
import Settle from "@/components/settle";
import Group from "@/components/group";

import { randString } from "./utils";

export type Transaction = {
  id: string;
  name: string;
  paid: number;
};

export type MapTransactions = Record<Transaction["id"], Transaction[]>;

export default function Home() {
  // TODO Handle accept other currencies
  const [currency] = useState("$");
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Map transactions by username
  const mapTransactions: MapTransactions = transactions.reduce(
    (acc: MapTransactions, transaction) => {
      const username = transaction.name.toLowerCase();
      if (!acc[username]) {
        acc[username] = [transaction];
      } else {
        acc[username] = [...acc[username], transaction];
      }
      return acc;
    },
    {}
  );

  // Total transactions amount
  const totalSpent = transactions.reduce((t, r) => (t += r.paid), 0);

  // Remove a transaction by ID
  const onRemove = (transactionId: string) => {
    setTransactions(transactions.filter(({ id }) => id !== transactionId));
  };

  // Handle submit form
  const handleSubmit = ({ name, paid }: FormState) => {
    const rgx = new RegExp("^-?\\d*(\\.\\d+)?$"); // Only integers and floats (comma is falsy)
    if (!rgx.test(paid) || parseFloat(paid) <= 0) return;
    setTransactions([
      ...transactions,
      { name, paid: parseFloat(paid), id: randString() },
    ]);
  };

  return (
    <main className="w-full max-w-lg mx-auto p-4">
      <Header />

      <Total total={totalSpent} currency={currency} />

      <Group
        mapTransactions={mapTransactions}
        currency={currency}
        onRemove={onRemove}
      />

      <Form onSubmit={handleSubmit} />

      <Settle
        totalSpent={totalSpent}
        mapTransactions={mapTransactions}
        clearAll={() => setTransactions([])}
      />
    </main>
  );
}
