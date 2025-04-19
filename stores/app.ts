import database from "../assets/data/data.json";

import { defineStore } from "pinia";
import type { Transaction, Pot, Budget } from "~/helpers/DTO";

export const useAppStore = defineStore("app", () => {
  const pots = ref<Pot[]>(database.pots);
  const transactions = ref<Transaction[]>(database.transactions);
  const budgets = ref<Budget[]>(database.budgets);
  const balance = ref(database.balance);

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

  function getRecurringBillsSummary(date: string) {
    const recurring = getRecurringBills();
    const referenceDate = new Date(date);
    const paid = recurring.filter(
      (bill) => new Date(bill.date).valueOf() < referenceDate.valueOf()
    );
    const upcoming = recurring.filter(
      (bill) => new Date(bill.date).valueOf() >= referenceDate.valueOf()
    );
    const dueSoon = recurring.filter((bill) => {
      const billDate = new Date(bill.date);
      return (
        billDate.valueOf() >= referenceDate.valueOf() &&
        billDate.valueOf() <= referenceDate.valueOf() + 1000 * 60 * 60 * 24 * 5
      ); //Is within 5 days from now
    });

    return { paid: paid, upcoming: upcoming, dueSoon: dueSoon };
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
        monthlyExpenses: -1 * monthlyTransactionsByCat[budget.category],
      };
    });

    return condensedBudget;
  }

  return {
    pots,
    transactions,
    budgets,
    balance,
    getFilteredTransactions,
    getRecurringBills,
    getTransactionsFromBudget,
    getMonthlyBudgetSummary,
    getRecurringBillsSummary,
  };
});
