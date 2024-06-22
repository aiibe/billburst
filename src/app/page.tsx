"use client";

import { useState } from "react";

import Header from "@/components/header";
import Total from "@/components/total";
import Settle from "@/components/settle";
import Group from "@/components/group";
import AddExpenseForm from "@/components/addExpenseForm/form";
import AddExpenseDialog from "@/components/addExpenseForm/dialog";

import { useTransactionStore, Transaction } from "@/store/transactions";

export type MapTransactions = Record<Transaction["id"], Transaction[]>;

export default function Home() {
  // TODO Handle accept other currencies
  const [currency] = useState("$");

  const transactions = useTransactionStore((state) => state.transactions);

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

  return (
    <main className="w-full max-w-lg mx-auto p-4">
      <Header />

      <Total total={totalSpent} currency={currency} />

      <Group mapTransactions={mapTransactions} currency={currency} />

      {transactions.length <= 1 ? <AddExpenseForm /> : <AddExpenseDialog />}

      <Settle totalSpent={totalSpent} mapTransactions={mapTransactions} />
    </main>
  );
}
