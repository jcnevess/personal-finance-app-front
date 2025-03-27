<script setup lang="ts">
import type { Pot } from "~/helpers/DTO";

const { pot, isWithdrawal = true } = defineProps<{
  pot: Pot;
  isWithdrawal?: boolean;
}>();

const amount = ref<number | undefined>(undefined);

const newAmmount = computed(() => pot.total + (amount.value ?? 0));
const initialProportion = computed(() => pot.total / pot.target);
const initialPercentageText = computed(
  () => initialProportion.value * 100 + "%"
);
const newProportion = computed(() => newAmmount.value / pot.target);
const newPercentageText = computed(() => newProportion.value * 100 + "%");
</script>

<template>
  <dialog open>
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <h1 v-if="!isWithdrawal">Add to 'Savings'</h1>
        <h1 v-else>Withdraw from 'Savings'</h1>
        <div class="button-close icon-clickable">
          <IconsIconCloseModal />
        </div>
      </div>
      <p v-if="!isWithdrawal">Add a new amount to yout pot.</p>
      <p v-else>Withdraw a new amount from yout pot.</p>
      <div class="infos">
        <div class="info-header">
          <p>New Amount</p>
          <p>{{ `\$${newAmmount}` }}</p>
        </div>

        <div class="meter">
          <div class="meter-bar">
            <div class="meter-bar-transaction" />
            <div class="meter-bar-indicator" />
          </div>
        </div>

        <div class="info-footer">
          <p class="info-percentage">
            {{ newPercentageText }}
          </p>
          <p class="info-target">{{ `Target of \$${pot.target}` }}</p>
        </div>
      </div>

      <form action="#" class="transaction" @submit.prevent>
        <div class="form-item">
          <label v-if="!isWithdrawal" for="name" class="form-control"
            >Amount to Add</label
          >
          <label v-else for="name" class="form-control"
            >Amount to Withdaw</label
          >
          <input
            v-model="amount"
            id="amount"
            type="number"
            min="0"
            name="amount"
            placeholder="e.g. 50"
            class="form-input transaction-amount"
            autocomplete="off"
          />
        </div>

        <button v-if="!isWithdrawal">Confirm Addition</button>
        <button v-else>Confirm Withdrawal</button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.meter-bar-indicator {
  background-color: var(--color-background-dark);
  width: v-bind("initialPercentageText");
  position: relative;
  z-index: 1;
}

.meter-bar-transaction {
  height: 100%;
  position: absolute;
  border-radius: 5px;
  width: v-bind("newPercentageText");
  background-color: var(--color-highlight);
  z-index: 0;
}
</style>
