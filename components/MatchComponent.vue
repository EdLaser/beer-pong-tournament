<template>
  <h1 class="text-2xl/normal">Matches</h1>
  <div class="flex flex-col gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <div class="flex justify-between">
      <select v-model="team1">
        <option value="null" disabled>Team 1...</option>
        <option v-for="team in teams" :value="team.uuid">
          {{ team.team_name }}
        </option>
      </select>
      <select v-model="team2">
        <option value="null" disabled>Team 2...</option>
        <option v-for="team in teams" :value="team.uuid">
          {{ team.team_name }}
        </option>
      </select>
    </div>
    <button
      @click="createMatch()"
      class="bg-gray-400 p-1 rounded-md text-white"
    >
      Match erstellen
    </button>
  </div>
  <div class="flex flex-col">
    <h3 class="text-lg">Alle Matches:</h3>
    <MatchCard
      v-for="match in data"
      :key="match.uuid"
      :uuid="match.uuid"
      :team1="match.team1"
      :team2="match.team2"
      :winner="match.winner"
      :is-draw="match.is_draw"
      :missing-cups="match.missing_cups"
    />
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "./TeamComponent.vue";

const team1 = ref("null");
const team2 = ref("null");

const {
  data: teams,
  pending: pen,
  refresh,
} = await useFetch<Array<Team>>("/api/get-teams", {
  method: "GET",
});

const { data, pending, error } = await useFetch("/api/get-matches", {
  method: "GET",
});
console.log(data);

const createMatch = async () => {
  await useFetch("/api/create-match", {
    method: "POST",
    body: {
      team1: team1.value,
      team2: team2.value,
    },
  });
  await refresh();
};
</script>
