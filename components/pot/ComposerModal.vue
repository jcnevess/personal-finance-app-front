<script setup lang="ts">
import type { Pot } from "~/helpers/DTO";

const { pot, showModal } = defineProps<{ pot?: Pot; showModal: boolean }>();
const emit = defineEmits<{ closeCompose: [] }>();

const name = computed(() => pot?.name);
const target = computed(() => pot?.target);
const theme = computed(() => pot?.theme);

const showThemeOptions = ref(false);

const themeOptions = ref([
  { name: "green", color: "#277c78" },
  { name: "yellow", color: "#f2cdac" },
  { name: "cyan", color: "#82c9d7" },
  { name: "purple", color: "#826cb0" },
]);

const modal = useTemplateRef("modal");

watch(
  () => showModal,
  () => {
    if (showModal) {
      modal.value?.showModal();
    } else {
      modal.value?.close();
    }
  }
);

function changeTheme() {
  showThemeOptions.value = false;
  //TODO implement logic
}

function addPot() {
  emit("closeCompose");
  //TODO
}
</script>

<template>
  <dialog ref="modal">
    <div class="dialog-wrapper">
      <div class="dialog-header">
        <h1 v-if="pot !== undefined">Edit Pot</h1>
        <h1 v-else>Add New Pot</h1>
        <div
          class="button-close"
          role="button"
          title="Close Modal"
          @click="emit('closeCompose')"
        >
          <IconCloseModal class="icon-clickable" />
        </div>
      </div>
      <p class="helper-text">
        Create a pot to set savings targets. These can help keep you on track as
        you save for special purchases.
      </p>
      <form action="#" @submit.prevent>
        <div class="form-item">
          <label for="name" class="form-control">Pot Name</label>
          <input
            v-model="name"
            id="name"
            type="text"
            name="name"
            placeholder="e.g. Rainy Days"
            class="form-input"
            autocomplete="off"
            :disabled="pot !== undefined"
          />
        </div>
        <div class="form-item">
          <label for="target" class="form-control">Target</label>
          <input
            v-model="target"
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
          <button
            class="form-input form-select"
            name="theme"
            @click="showThemeOptions = !showThemeOptions"
          >
            <span class="theme-color theme-color-selected" />
            <span class="theme-name">{{ theme || "Green" }}</span>
          </button>
          <ul v-show="showThemeOptions" class="form-options">
            <ThemeOption
              v-for="themeOption in themeOptions"
              :key="themeOption.name"
              :name="themeOption.name"
              :color="themeOption.color"
              @click="changeTheme"
            />
          </ul>
        </div>
        <button @click="addPot">Add Pot</button>
      </form>
    </div>
  </dialog>
</template>

<style scoped>
.theme-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.theme-color-selected {
  background-color: v-bind("theme || '#277c78'");
}

.theme-name {
  color: black;
  text-transform: capitalize;
}
</style>
