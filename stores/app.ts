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

  /*function getSortedTransactions(sort: string) {
    switch (sort) {
      case "Oldest":
        return transactions.value.toSorted((a, b) => {});
    }
  }*/

  return { pots, transactions, getFilteredTransactions };
});
