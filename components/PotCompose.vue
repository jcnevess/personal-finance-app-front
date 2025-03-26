<script setup></script>

<template>
  <dialog open>
    <div class="header">
      <h1>Add New Pot</h1>
      <IconsIconCloseModal class="icon" />
    </div>
    <p class="helper-text">
      Create a pot to set savings targets. These can help keep you on track as
      you save for special purchases.
    </p>
    <form action="#" @submit.prevent>
      <div class="form-item">
        <label for="name" class="form-control">Pot Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. Rainy Days"
          class="form-input"
          autocomplete="off"
        />
      </div>
      <div class="form-item">
        <label for="target" class="form-control">Target</label>
        <input
          id="target"
          type="text"
          name="target"
          placeholder="e.g. 2000"
          class="form-input"
          autocomplete="off"
        />
      </div>
      <div class="form-item anchor">
        <label for="theme" class="form-control">Theme</label>
        <button class="form-input form-select" name="theme">
          <span class="theme-color" />
          <span class="theme-name">Green</span>
        </button>
        <ul class="form-options">
          <li class="form-option">
            <span class="theme-color" />
            <span class="theme-name">Green</span>
          </li>
          <li class="form-option">
            <span class="theme-color" />
            <span class="theme-name">Red</span>
          </li>
        </ul>
      </div>
      <button>Add Pot</button>
    </form>
  </dialog>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon {
  color: var(--color-text-paragraph);
}

.form-item {
  display: flex;
  flex-direction: column;
}

.form-control {
  font-size: 0.75rem;
  font-weight: bold;
  color: var(--color-text-paragraph);
}

.form-input {
  padding: 0.75rem 1rem;
  border-radius: 5px;
  border: 1px solid var(--color-background-dark);
  line-height: 150%;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.icon {
  cursor: pointer;
}

.form-select {
  appearance: none;
  background: url("~/assets/icons/icon-caret-down.svg") no-repeat 95%;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: normal;
}

.form-options {
  border-radius: 5px;
  box-shadow: 0 0 5px black;
  overflow: hidden;
  position: absolute;
  top: 120%;
  background-color: white;
  width: 100%;
}

.form-option {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 1rem;
  line-height: 150%;
  font-size: 0.9rem;
  border-top: 1px solid var(--color-text-primary);
}

.form-option:hover,
.form-option:active {
  background-color: var(--color-background-bright);
}

.form-option:first-of-type {
  border-top: unset;
}

.theme-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: aqua;
}

.theme-name {
  color: black;
}

.anchor {
  position: relative;
}
</style>
