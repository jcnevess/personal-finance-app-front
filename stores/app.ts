import database from "../assets/data/data.json";

import { ref } from "vue";
import { defineStore } from "pinia";
import type { Pot } from "~/helpers/DTO";

export const useAppStore = defineStore("app", () => {
  const pots = ref<Pot[]>(database.pots);

  return { pots };
});
