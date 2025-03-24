<script setup lang="ts">
const navbarHidden = ref(false);

function toggleNavbar() {
  navbarHidden.value = !navbarHidden.value;
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
          <LogoComponent :small-size="navbarHidden" />
        </div>
        <ul class="navbar-items">
          <li class="navbar-item navbar-item-active">
            <NuxtLink to="/" class="navbar-link">
              <IconsIconNavOverview /><span class="navbar-item-text"
                >Overview</span
              ></NuxtLink
            >
          </li>
          <li class="navbar-item">
            <NuxtLink to="/transactions" class="navbar-link">
              <IconsIconNavTransactions /><span
                to="/transactions"
                class="navbar-item-text"
                >Transactions</span
              >
            </NuxtLink>
          </li>
          <li class="navbar-item">
            <NuxtLink to="/budgets" class="navbar-link">
              <IconsIconNavBudgets />
              <div to="/budgets" class="navbar-item-text">Budgets</div>
            </NuxtLink>
          </li>
          <li class="navbar-item">
            <NuxtLink to="/pots" class="navbar-link">
              <IconsIconNavPots />
              <div to="/pots" class="navbar-item-text">Pots</div>
            </NuxtLink>
          </li>
          <li class="navbar-item">
            <NuxtLink to="/recurring" class="navbar-link">
              <IconsIconNavRecurringBills />
              <div to="/recurring" class="navbar-item-text">
                Recurring Bills
              </div>
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
  height: 100dvh;
}

.lateral-bar {
  background-color: var(--color-navbar-background-dark);
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

.lateral-bar-collapsed .navbar-item {
  padding: 1rem 1.75rem;
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
  background-color: var(--color-navbar-background-bright);
  color: var(--color-text-secondary);
  border-left: 3px solid var(--color-navbar-highlight);
  cursor: default;
}

.navbar-item-active .navbar-item-text {
  color: var(--color-text-secondary);
}

.navbar-item-active svg {
  color: var(--color-navbar-highlight);
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
}

.lateral-bar-collapsed .navbar-hide svg {
  scale: 150%;
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
