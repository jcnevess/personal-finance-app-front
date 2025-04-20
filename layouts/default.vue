<script setup lang="ts">
const navbarHidden = ref(false);
const route = useRoute();

useSeoMeta({
  title: () => route.meta.title,
});

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
              <IconNavOverview />
              <span class="navbar-item-text">Overview</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/transactions"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/transactions') }"
            >
              <IconNavTransactions />
              <span class="navbar-item-text">Transactions</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/budgets"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/budgets') }"
            >
              <IconNavBudgets />
              <span class="navbar-item-text">Budgets</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/pots"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/pots') }"
            >
              <IconNavPots />
              <span class="navbar-item-text">Pots</span>
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              to="/recurring"
              class="navbar-link navbar-item"
              :class="{ 'navbar-item-active': currentPageIs('/recurring') }"
            >
              <IconNavRecurringBills />
              <span class="navbar-item-text">Recurring Bills</span>
            </NuxtLink>
          </li>
        </ul>
        <button class="navbar-hide navbar-item" @click="toggleNavbar">
          <IconCaretRight v-if="navbarHidden" />
          <IconMinimizeMenu v-else />
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
  z-index: 1000;
  top: 0;
  background-color: var(--color-background-dark);
  color: var(--color-text-primary);
  width: 20%;
  min-width: 200px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 2.5rem 0.75rem 2.5rem 0;
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

@media (max-width: 880px) {
  .lateral-bar {
    position: fixed;
    bottom: 0;
    top: unset;
    height: auto;
    width: 100%;
    border-bottom-right-radius: unset;
    border-top-left-radius: 10px;
    padding: 1rem 0 0;
  }

  .navbar {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .navbar-logo {
    display: none;
  }

  .navbar-items {
    display: flex;
    flex-grow: 0;
    gap: 0.5rem;
  }

  .navbar-item {
    padding: clamp(
      0.5rem,
      calc(0.105rem + 1.975vw),
      1rem
    ); /* min: 8px, max: 16px */
    border-bottom-right-radius: unset;
    border-top-left-radius: 10px;
  }

  .navbar-item-active {
    border-left: unset;
    border-bottom: 5px solid var(--color-highlight);
  }

  .navbar-link svg {
    width: 24px;
    height: 24px;
  }

  .navbar-item-text {
    display: none;
  }

  .navbar-hide {
    display: none;
  }

  .contents {
    margin-bottom: 78px; /* Navbar size */
    padding-inline: clamp(0.5rem, calc(-4.114rem + 21.818vw), 2rem);
  }
}
</style>
