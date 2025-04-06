<script setup lang="ts">
import type { Transaction } from "~/helpers/DTO";
import { getImageURI, sortTransactionsByCriteria } from "~/helpers/helpers";

const store = useAppStore();

const showSortSelector = ref(false);
const showCategorySelector = ref(false);

const selectedSort = ref("Latest");
const selectedCategory = ref("All Transactions");
const selectedPage = ref(1);
const searchTerm = ref<string>();

const numberOfTransactions = ref<number>(0);
const transactionsFromCategory = ref<Transaction[]>();
const displayedTransactions = ref<Transaction[]>();

const DISPLAYED_PER_PAGE = 10;

const sortOptions = [
  "Latest",
  "Oldest",
  "A to Z",
  "Z to A",
  "Highest",
  "Lowest",
];

const categoryOptions = [
  "All Transactions",
  "Entertainment",
  "Bills",
  "Groceries",
  "Dining Out",
  "Transportation",
  "Personal Care",
  "Education",
  "Lifestyle",
  "Shopping",
];

watch(
  [selectedCategory, searchTerm, selectedSort, selectedPage],
  () => {
    transactionsFromCategory.value = store.getFilteredTransactions(
      selectedCategory.value
    );

    let searchedTransactions = transactionsFromCategory.value;
    if (searchTerm.value) {
      const searchTermRegex = new RegExp(
        String.raw`^${searchTerm.value}`,
        "gi"
      );
      searchedTransactions = searchedTransactions.filter((transaction) =>
        transaction.name.match(searchTermRegex)
      );
    }

    numberOfTransactions.value = searchedTransactions.length;

    const orderedTransactions = sortTransactionsByCriteria(
      searchedTransactions,
      selectedSort.value
    );

    displayedTransactions.value = orderedTransactions.filter(
      (transaction, index) =>
        index >= (selectedPage.value - 1) * DISPLAYED_PER_PAGE &&
        index < selectedPage.value * DISPLAYED_PER_PAGE
    );
  },
  { immediate: true }
);

function toggleSortSelector() {
  showSortSelector.value = !showSortSelector.value;
  showCategorySelector.value = false;
}

function toggleCategorySelector() {
  showCategorySelector.value = !showCategorySelector.value;
  showSortSelector.value = false;
}

function selectCategory(category: string) {
  selectedCategory.value = category;
  toggleCategorySelector();
}

function getFormattedDate(date: string) {
  const dateString = new Date(date).toDateString().split(" ");
  return `${dateString[2]} ${dateString[1]}, ${dateString[3]}`;
}

function getFormattedAmount(amount: number) {
  if (amount > 0) {
    return `+ $${amount.toFixed(2)}`;
  } else {
    return `- $${amount.toFixed(2).slice(1)}`;
  }
}

function selectPage(pageNumber: number) {
  selectedPage.value = pageNumber;
}

function selectSort(sortType: string) {
  selectedSort.value = sortType;
  toggleSortSelector();
}

/*function sortByCriteria(list: Transaction[], sortType: string) {
  switch (sortType) {
    case "Oldest":
      return list.toSorted(
        (t1, t2) => new Date(t1.date).valueOf() - new Date(t2.date).valueOf()
      );
    case "A to Z":
      return list.toSorted((t1, t2) => t1.name.localeCompare(t2.name));
    case "Z to A":
      return list.toSorted((t1, t2) => t2.name.localeCompare(t1.name));
    case "Highest":
      return list.toSorted((t1, t2) => t2.amount - t1.amount);
    case "Lowest":
      return list.toSorted((t1, t2) => t1.amount - t2.amount);
    default:
      return list.toSorted(
        (t1, t2) => new Date(t2.date).valueOf() - new Date(t1.date).valueOf()
      );
  }
}*/
</script>

<template>
  <div class="wrapper">
    <header>
      <h1>Transactions</h1>
    </header>

    <div class="transaction-table">
      <div class="table-controls">
        <div class="search-bar anchor">
          <input
            v-model="searchTerm"
            id="transaction-searchbar"
            type="input"
            name="search"
            class="form-input"
            placeholder="Search transactions"
            title="Search transactions"
            autocomplete="false"
          />

          <IconsIconSearch class="icon-search" />
        </div>

        <div class="form-item anchor">
          <label class="form-control">Sort by</label>
          <button
            class="form-input form-select"
            title="Sort by"
            @click="toggleSortSelector"
          >
            {{ selectedSort }}
          </button>
          <ul v-show="showSortSelector" class="form-options">
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

        <div class="form-item anchor">
          <label for="" class="form-control">Category</label>
          <button
            class="form-input form-select"
            title="Category"
            @click="toggleCategorySelector"
          >
            {{ selectedCategory }}
          </button>
          <ul v-show="showCategorySelector" class="form-options">
            <li
              v-for="option in categoryOptions"
              :key="option"
              class="form-option"
              @click="selectCategory(option)"
            >
              {{ option }}
            </li>
          </ul>
        </div>
      </div>

      <table class="table-data">
        <thead>
          <tr>
            <th scope="col" class="justify-start">Recipient/Sender</th>
            <th scope="col" class="justify-start">Category</th>
            <th scope="col" class="justify-start">Transaction Date</th>
            <th scope="col" class="justify-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in displayedTransactions"
            :key="transaction.date"
          >
            <td>
              <div class="client-info emphasis justify-start">
                <img
                  :src="getImageURI(transaction.avatar)"
                  :alt="transaction.name"
                />
                <span>{{ transaction.name }}</span>
              </div>
            </td>
            <td>{{ transaction.category }}</td>
            <td>{{ getFormattedDate(transaction.date) }}</td>
            <td
              class="emphasis justify-end"
              :class="{
                deposit: transaction.amount > 0,
                withdrawal: transaction.amount < 0,
              }"
            >
              {{ getFormattedAmount(transaction.amount) }}
            </td>
          </tr>
        </tbody>
      </table>

      <div class="table-pagination">
        <button
          class="pagination-arrow"
          :disabled="selectedPage - 1 <= 0"
          @click="selectPage(selectedPage - 1)"
        >
          <IconsIconCaretLeft />
        </button>
        <div class="pagination-group">
          <div
            v-show="selectedPage - 2 > 0"
            class="pagination-page"
            @click="selectPage(selectedPage - 2)"
          >
            {{ selectedPage - 2 }}
          </div>
          <div
            v-show="selectedPage - 1 > 0"
            class="pagination-page"
            @click="selectPage(selectedPage - 1)"
          >
            {{ selectedPage - 1 }}
          </div>
          <div class="pagination-page current-page">{{ selectedPage }}</div>
          <div
            v-show="numberOfTransactions / DISPLAYED_PER_PAGE > selectedPage"
            class="pagination-page"
            @click="selectPage(selectedPage + 1)"
          >
            {{ selectedPage + 1 }}
          </div>
          <div
            v-show="
              numberOfTransactions / DISPLAYED_PER_PAGE > selectedPage + 1
            "
            class="pagination-page"
            @click="selectPage(selectedPage + 2)"
          >
            {{ selectedPage + 2 }}
          </div>
        </div>
        <button
          class="pagination-arrow"
          :disabled="numberOfTransactions / DISPLAYED_PER_PAGE <= selectedPage"
          @click="selectPage(selectedPage + 1)"
        >
          <IconsIconCaretRight />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transaction-table {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.table-controls {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

#transaction-searchbar::placeholder {
  font-size: 0.9rem;
}

.form-item {
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.form-control {
  font-weight: normal;
  font-size: 0.9rem;
}

.form-select {
  padding-inline: 2rem 3rem;
}

.table-data {
  width: 100%;
  grid-template-columns: 1fr 20% 20% 20%;
}

tr {
  grid-column: 1 / span 4;
}

tbody tr {
  border-top: 1px solid var(--color-text-primary);
  border-collapse: collapse;
}

.table-pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.pagination-group {
  display: flex;
  gap: 0.5rem;
}

.deposit {
  color: var(--color-highlight);
}

.withdrawal {
  color: var(--color-destructive-action);
}

.pagination-page {
  cursor: pointer;
  font-size: 0.875rem;
  width: 4ch;
  aspect-ratio: 1;
  border-radius: 10px;
  border: 1px solid var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.pagination-page:active,
.pagination-page:hover {
  background-color: black;
  color: white;
  border-color: black;
}

.current-page {
  background-color: black;
  color: white;
  border-color: black;
}

.pagination-arrow {
  background-color: transparent;
  color: var(--color-text-primary);
  border-radius: 10px;
  border: 1px solid var(--color-text-primary);
}

.pagination-arrow:hover,
.pagination-arrow:active {
  color: black;
  border-color: black;
}

.form-input {
  border-radius: 10px;
  border-color: var(--color-text-primary);
}

.search-bar {
  flex-grow: 1;
}

.icon-search {
  position: absolute;
  right: 5%;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-text-paragraph);
}

#transaction-searchbar {
  width: 100%;
}
</style>
