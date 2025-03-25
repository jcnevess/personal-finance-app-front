<script setup lang="ts"></script>

<template>
  <div>
    <h1>Pots</h1>
    <PotView name="Nada" :target="2500" :total="1500" theme="green" />
    <PotDelete ref="delete-modal" pot-name="Savings" />
  </div>
</template>
