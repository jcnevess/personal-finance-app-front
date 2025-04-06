import database from "../assets/data/data.json";

import { defineStore } from "pinia";
import type { Transaction, Pot } from "~/helpers/DTO";

export const useAppStore = defineStore("app", () => {
  const pots = ref<Pot[]>(database.pots);
  const transactions = ref<Transaction[]>(database.transactions);

  function getFilteredTransactions(filter: string): Transaction[] {
    if (filter === "All Transactions") {
      return transactions.value;
    } else {
      return transactions.value.filter(
        (transaction) => transaction.category === filter
      );
    }
  }

  function getRecurringBills(): Transaction[] {
    return transactions.value.filter((transaction) => transaction.recurring);
  }

  return { pots, transactions, getFilteredTransactions, getRecurringBills };
});
