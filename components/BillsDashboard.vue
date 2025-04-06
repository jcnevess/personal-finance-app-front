<script setup lang="ts">
import type { Transaction } from "~/helpers/DTO";
import { getImageURI, sortTransactionsByCriteria } from "~/helpers/helpers";

const appStore = useAppStore();

const recurringBills = ref(appStore.getRecurringBills());
const showSortOptions = ref(false);
const selectedSort = ref("Latest");
const searchTerm = ref<string>();
const displayedBills = ref<Transaction[]>();

const sortOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

function getFormattedDate(date: string) {
  const dateAsObject = new Date(date);
  const dayOfMonth = dateAsObject.getDate();

  if (dayOfMonth === 1) {
    return `${dayOfMonth}st`;
  } else if (dayOfMonth === 2) {
    return `${dayOfMonth}nd`;
  } else if (dayOfMonth === 3) {
    return `${dayOfMonth}rd`;
  } else {
    return `${dayOfMonth}th`;
  }
}

function getFormattedAmount(amount: number) {
  return `$${amount.toFixed(2).slice(1)}`;
}

function searchBill(searchTerm: string) {
  const searchTermRegex = new RegExp(String.raw`^${searchTerm}`, "gi");
  return recurringBills.value.filter((bill) =>
    bill.name.match(searchTermRegex)
  );
}

function toggleSortSelector() {
  showSortOptions.value = !showSortOptions.value;
}

function selectSort(sort: string) {
  selectedSort.value = sort;
  showSortOptions.value = false;
}

watch(
  [searchTerm, selectedSort],
  () => {
    let filteredBills = recurringBills.value;
    if (searchTerm.value) {
      filteredBills = searchBill(searchTerm.value);
    }

    displayedBills.value = sortTransactionsByCriteria(
      filteredBills,
      selectedSort.value
    );
  },
  { immediate: true }
);
</script>

<template>
  <div class="wrapper">
    <h1>Recurring Bills</h1>

    <div class="grid-wrapper">
      <div class="total-view grid-item">
        <IconsIconRecurringBills />
        <div class="bills-view">
          <div>Total bills</div>
          <div class="bills-total">$384.98</div>
        </div>
      </div>

      <div class="summary-view grid-item">
        <div class="summary-heading">Summary</div>
        <ul class="summary-table">
          <li class="summary-entry">
            <div class="entry-title">Paid Bills</div>
            <div class="entry-info">4 ($190.00)</div>
          </li>
          <li class="summary-entry">
            <div class="entry-title">Total Upcoming</div>
            <div class="entry-info">4 ($194.98)</div>
          </li>
          <li class="summary-entry entry-due">
            <div class="entry-title">Due Soon</div>
            <div class="entry-info">2 ($59.98)</div>
          </li>
        </ul>
      </div>

      <div class="bills-list grid-item">
        <div class="list-controls">
          <div class="search-box anchor">
            <input
              type="text"
              class="search-input form-input"
              placeholder="Search transactions"
              v-model="searchTerm"
            />
            <IconsIconSearch class="icon-search" />
          </div>
          <div class="form-item">
            <div class="form-control">Sort by</div>
            <div class="select-form anchor">
              <button
                class="form-input form-select"
                @click="toggleSortSelector"
              >
                {{ selectedSort }}
              </button>
              <ul v-show="showSortOptions" class="form-options">
                <li
                  v-for="option in sortOptions"
                  :key="option"
                  class="form-option"
                  @click="selectSort(option)"
                >
                  {{ option }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <table class="table-data">
          <thead>
            <tr>
              <td>Bill Title</td>
              <td>Due Date</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(bill, index) in displayedBills" :key="bill.date">
              <td class="client-info emphasis">
                <img :src="getImageURI(bill.avatar)" :alt="bill.name" />
                <span>{{ bill.name }}</span>
              </td>
              <td class="due-info">
                <span>{{ `Monthly - ${getFormattedDate(bill.date)}` }}</span>
                <span class="due-icon">
                  <IconsIconBillPaid v-show="index <= 3" />
                  <IconsIconBillDue v-show="index > 6" />
                </span>
              </td>
              <td class="emphasis">
                {{ getFormattedAmount(bill.amount) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bills-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.entry-info {
  font-weight: bold;
  color: black;
}

.grid-wrapper {
  display: grid;
  grid-template-columns: 35% 1fr;
  grid-template-rows: auto 1fr;
  gap: 1.5rem;
  align-items: start;
}

.summary-entry:not(:first-child) {
  border-top: 1px solid var(--color-text-primary);
}

.summary-entry {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-text-paragraph);
  font-size: 0.75rem;
  padding: 0.75rem;
}

.summary-table {
  display: flex;
  flex-direction: column;
  list-style: none;
}

.summary-heading {
  font-size: 1.125rem;
  font-weight: bold;
}

.summary-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 10px;
  background-color: white;
  padding: 2rem;
  grid-column: 1 / span 1;
}

.entry-due {
  color: var(--color-destructive-action);
}

.entry-due .entry-info {
  color: inherit;
}

.table-data {
  width: 100%;
  grid-template-columns: 1fr 1fr 20%;
}

tr {
  grid-column: 1 / span 4;
}

tbody tr {
  border-top: 1px solid var(--color-text-primary);
  border-collapse: collapse;
}

.bills-list {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  grid-row: 1 / span 2;
  grid-column: 2;
}

.form-input {
  border-radius: 10px;
  border-color: var(--color-text-primary);
}

.icon-search {
  position: absolute;
  top: 50%;
  right: 1rem;
  transform: translateY(-50%);
  color: var(--color-text-primary);
}

.list-controls {
  display: flex;
  justify-content: space-between;
}

.form-item {
  flex-direction: row;
}

.due-info {
  display: flex;
  gap: 0.25rem;
}

.form-item {
  align-items: center;
}

.form-control {
  font-weight: normal;
  font-size: 0.9rem;
}

.form-options {
  position: absolute;
}

.form-select {
  padding-right: 3rem;
  min-width: 120px;
}

.search-box {
  width: 60%;
}

.search-input {
  width: 100%;
}

.total-view {
  border-radius: 10px;
  background-color: var(--color-background-dark);
  padding: 2rem;
  color: white;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.bills-total {
  font-size: 2rem;
  font-weight: bold;
}

.bills-view {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
