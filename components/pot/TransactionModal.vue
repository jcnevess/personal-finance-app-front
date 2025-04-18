<script setup lang="ts">
import type { Pot } from "~/helpers/DTO";

const {
  pot,
  isWithdrawal = false,
  showModal,
} = defineProps<{
  pot: Pot;
  isWithdrawal?: boolean;
  showModal: boolean;
}>();

const emit = defineEmits<{ closeTransaction: [] }>();

const modal = useTemplateRef("modal");

const amount = ref<number | undefined>(undefined);

const newAmmount = computed(() => {
  if (isWithdrawal) {
    return pot.total - (amount.value ?? 0);
  } else {
    return pot.total + (amount.value ?? 0);
  }
});

const initialProportion = computed(() => pot.total / pot.target);
const initialPercentageText = computed(
  () => (initialProportion.value * 100).toFixed(2) + "%"
);

const newProportion = computed(() => newAmmount.value / pot.target);
const newPercentageText = computed(
  () => (newProportion.value * 100).toFixed(2) + "%"
);

watch(
  () => showModal,
  () => {
    if (showModal) {
      modal.value?.showModal();
      amount.value = undefined;
    } else {
      modal.value?.close();
    }
  }
);

function formatDecimal(numberToFormat: number) {
  return numberToFormat.toFixed(2);
}
</script>

<template>
  <dialog ref="modal">
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <h1 v-if="!isWithdrawal">{{ `Add to '${pot.name}'` }}</h1>
        <h1 v-else>{{ `Withdraw from '${pot.name}'` }}</h1>
        <div
          class="button-close icon-clickable"
          @click="emit('closeTransaction')"
        >
          <IconCloseModal />
        </div>
      </div>
      <p v-if="!isWithdrawal">Add a new amount to yout pot.</p>
      <p v-else>Withdraw a new amount from yout pot.</p>
      <div class="infos">
        <div class="info-header">
          <p>New Amount</p>
          <p class="info-amount balance-display">
            {{ `\$${formatDecimal(newAmmount)}` }}
          </p>
        </div>

        <div class="meter">
          <div class="meter-bar">
            <div
              class="meter-bar-transaction"
              :class="{
                'meter-bar-transaction-withdrawal': isWithdrawal,
                'meter-bar-transaction-add': !isWithdrawal,
              }"
            />
            <div
              class="meter-bar-indicator"
              :class="{
                'meter-bar-indicator-withdrawal': isWithdrawal,
                'meter-bar-indicator-add': !isWithdrawal,
              }"
            />
          </div>

          <div class="meter-footer">
            <p class="meter-percentage">
              {{ newPercentageText }}
            </p>
            <p class="meter-target">{{ `Target of \$${pot?.target}` }}</p>
          </div>
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
          <div class="amount-input anchor">
            <input
              id="amount"
              v-model="amount"
              type="number"
              min="0"
              :max="isWithdrawal ? pot.total : pot.target - pot.total"
              name="amount"
              placeholder="e.g. 50"
              class="form-input transaction-amount"
              autocomplete="off"
            />
            <p class="dollar-sign">$</p>
          </div>
        </div>

        <button v-if="!isWithdrawal" @click="emit('closeTransaction')">
          Confirm Addition
        </button>
        <button v-else @click="emit('closeTransaction')">
          Confirm Withdrawal
        </button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.meter-bar-indicator {
  width: v-bind("initialPercentageText");
  position: relative;
}

.meter-bar-indicator-add {
  background-color: var(--color-background-dark);
  z-index: 1;
}

.meter-bar-indicator-withdrawal {
  background-color: var(--color-destructive-action);
  z-index: 0;
}

.meter-bar-transaction {
  height: 100%;
  position: absolute;
  border-radius: 5px;
  width: v-bind("newPercentageText");
}

.meter-bar-transaction-add {
  background-color: var(--color-highlight);
  z-index: 0;
}

.meter-bar-transaction-withdrawal {
  background-color: var(--color-background-dark);
  z-index: 1;
}

.info-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meter-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.infos {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.dollar-sign {
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
}

.transaction-amount {
  width: 100%;
  padding-left: 2rem;
}
</style>
