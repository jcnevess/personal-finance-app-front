<script setup lang="ts">
const navbarHidden = ref(false);
const route = useRoute();

function toggleNavbar() {
  navbarHidden.value = !navbarHidden.value;
}

function currentPageIs(path: string) {
  return path === route.path;
}
</script>

<template>
  <div class="container">
    <aside
      class="lateral-bar"
      :class="{ 'lateral-bar-collapsed': navbarHidden }"
    >
      <nav class="navbar">
        <div class="navbar-logo">
          <LogoFinance :small-size="navbarHidden" />
        </div>
        <ul class="navbar-items">
          <li>
            <NuxtLink
              to="/"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/') }"
            >
              <IconsIconNavOverview />
              <span class="navbar-item-text">Overview</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/transactions"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/transactions') }"
            >
              <IconsIconNavTransactions />
              <span class="navbar-item-text">Transactions</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/budgets"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/budgets') }"
            >
              <IconsIconNavBudgets />
              <span class="navbar-item-text">Budgets</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/pots"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/pots') }"
            >
              <IconsIconNavPots />
              <span class="navbar-item-text">Pots</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/recurring"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/recurring') }"
            >
              <IconsIconNavRecurringBills />
              <span class="navbar-item-text">Recurring Bills</span>
            </NuxtLink>
          </li>
        </ul>
        <button class="navbar-hide navbar-item" @click="toggleNavbar">
          <IconsIconCaretRight v-if="navbarHidden" />
          <IconsIconMinimizeMenu v-else />
          <span class="navbar-item-text">Minimize Menu</span>
        </button>
      </nav>
    </aside>
    <main class="contents">
      <slot />
    </main>
  </div>
</template>

<style>
.container {
  display: flex;
  min-height: 100dvh;
  background-color: var(--color-background-bright);
}

.lateral-bar {
  height: 100dvh;
  position: sticky;
  top: 0;
  background-color: var(--color-background-dark);
  color: var(--color-text-primary);
  width: 20%;
  min-width: 200px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 1.5rem 0.75rem 1.5rem 0;
  user-select: none;
}

.lateral-bar-collapsed {
  width: unset;
  min-width: unset;
}

.lateral-bar-collapsed .navbar-item-text {
  display: none;
}

.navbar {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  justify-content: space-between;
}

.navbar-logo {
  margin-left: 1.5rem;
}

.navbar-logo img {
  width: 50%;
}

.navbar-items {
  flex-grow: 1;
  list-style: none;
}

.navbar-item {
  font-weight: bold;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  font-size: 0.875rem;
}

.navbar-link {
  padding: 1rem 1.25rem 1rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--color-text-primary);
}

.navbar-link svg {
  width: 16px;
  min-width: 16px;
}

.navbar-link:hover {
  color: white;
}

.navbar-item-active {
  background-color: var(--color-background-bright);
  color: var(--color-text-secondary);
  border-left: 3px solid var(--color-highlight);
  padding-left: calc(1.75rem - 3px);
  cursor: default;
}

.navbar-item-active .navbar-item-text {
  color: var(--color-text-secondary);
}

.navbar-item-active svg {
  color: var(--color-highlight);
}

.navbar-item-active:hover {
  color: var(--color-text-secondary);
}

.navbar-hide {
  padding: 1rem 1.25rem 1rem 1.75rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  background-color: transparent;
  color: var(--color-text-primary);
}

.navbar-hide:hover {
  color: white;
  background-image: unset;
}

.lateral-bar-collapsed .navbar-hide svg {
  scale: 150%;
  width: 100%;
}

.contents {
  padding: 2rem;
  flex-grow: 1;
}

@media (max-width: 768px) {
  .lateral-bar {
    display: none;
  }
}
</style>
