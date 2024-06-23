"use client";

import Header from "@/components/header";
import Expenses from "@/components/allExpenses/container";

export default function Home() {
  return (
    <main className="w-full max-w-lg mx-auto p-4">
      <Header />

      <Expenses />
    </main>
  );
}
