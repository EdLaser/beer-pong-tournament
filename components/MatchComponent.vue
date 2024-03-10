<template>
  <h1 class="text-5xl/normal">Matches</h1>
  <div class="flex flex-col gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <div class="flex justify-between">
      <div class="flex flex-col gap-1">
        <label>Team 1</label>
        <select class="rounded-md ring-1 ring-gray-400 p-1" v-model="team1">
          <option value="null" disabled>Auswählen...</option>
          <option v-for="team in teams" :value="team.uuid">
            {{ team.team_name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <label>Team 2</label>
        <select class="rounded-md ring-1 ring-gray-400 p-1" v-model="team2">
          <option value="null" disabled>Auswählen...</option>
          <option v-for="team in teams" :value="team.uuid">
            {{ team.team_name }}
          </option>
        </select>
      </div>
    </div>
    <button
      @click="async () => await store.createMatch(team1, team2)"
      class="bg-gray-400 p-1 rounded-md text-white"
    >
      Match erstellen
    </button>
  </div>
  <div class="flex flex-col">
    <h3 class="text-lg">Alle Matches:</h3>
    <div class="flex flex-col gap-3">
      <MatchCard
        v-for="match in matches"
        :key="match.uuid"
        :uuid="match.uuid"
        :team1="match.team1"
        :team2="match.team2"
        :winner="match.winner"
        :is-draw="match.is_draw"
        :missing-cups="match.missing_cups"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
const store = useBeerStore();
const { teams, matches } = storeToRefs(store);

const team1 = ref("null");
const team2 = ref("null");
</script>
