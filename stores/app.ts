import database from "../assets/data/data.json";

import { defineStore } from "pinia";
import type { Transaction, Pot, Budget } from "~/helpers/DTO";

export const useAppStore = defineStore("app", () => {
  const pots = ref<Pot[]>(database.pots);
  const transactions = ref<Transaction[]>(database.transactions);
  const budgets = ref<Budget[]>(database.budgets);

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

  function getTransactionsFromBudget(budgetCategory: string) {
    return transactions.value.filter(
      (transaction) => transaction.category === budgetCategory
    );
  }

  function getMonthlyBudgetSummary(month: number) {
    const monthlyTransactionsByCat = transactions.value
      .filter((transaction) => new Date(transaction.date).getMonth() === month)
      .reduce((acc, current) => {
        const groupKey = current.category;
        if (!acc[groupKey]) {
          acc[groupKey] = 0;
        }
        acc[groupKey] = acc[groupKey] + current.amount;
        return acc;
      }, {} as { [k: string]: number });

    const condensedBudget = budgets.value.map((budget) => {
      return {
        ...budget,
        monthlyExpenses: monthlyTransactionsByCat[budget.category],
      };
    });

    return condensedBudget;
  }

  return {
    pots,
    transactions,
    budgets,
    getFilteredTransactions,
    getRecurringBills,
    getTransactionsFromBudget,
    getMonthlyBudgetSummary,
  };
});
