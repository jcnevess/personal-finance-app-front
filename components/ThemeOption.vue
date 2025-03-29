<script setup lang="ts">
const { name, color } = defineProps<{ name: string; color: string }>();
</script>

<template>
  <li class="form-option">
    <span class="theme-color" />
    <span class="theme-name">{{ name }}</span>
  </li>
</template>

<style scoped>
.theme-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: v-bind("color");
}

.theme-name {
  color: black;
  text-transform: capitalize;
}
</style>
