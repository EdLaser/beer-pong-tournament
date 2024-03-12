<template>
  <h1 class="text-5xl/normal">Matches <Icon name="arcticons:litmatch"/></h1>
  <div class="flex flex-col gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <div class="flex justify-between">
      <div class="flex flex-col gap-1">
        <label for="team_one_select">Team 1</label>
        <select
          id="team_one_select"
          class="rounded-md ring-1 ring-gray-400 p-1"
          v-model="team1"
        >
          <option value="null" disabled>Auswählen...</option>
          <option v-for="team in teams" :value="team.uuid">
            {{ team.team_name }}
          </option>
        </select>
      </div>
      <div class="flex flex-col gap-1">
        <label for="team_two_select">Team 2</label>
        <select
          id="team_two_select"
          class="rounded-md ring-1 ring-gray-400 p-1"
          v-model="team2"
        >
          <option value="null" disabled>Auswählen...</option>
          <option v-for="team in teams" :value="team.uuid">
            {{ team.team_name }}
          </option>
        </select>
      </div>
    </div>
    <Button
      @click="async () => await store.createMatch(team1, team2)"
      class="bg-violet-700 p-1 rounded-md text-white"
    >
      Match erstellen
    </Button>
  </div>
  <div class="flex flex-col gap-3" v-if="matches.length > 0">
    <h3 class="text-2xl">Alle Matches:</h3>
    <div class="flex flex-col gap-3">
      <MatchCard
        v-for="(match, index) in matches"
        :nummer="index + 1"
        :key="match.uuid"
        :uuid="match.uuid"
        :team1="match.team1"
        :team2="match.team2"
        :winner="match.winner"
        :is-draw="match.draw"
        :missing-cups="match.missingCups"
      />
    </div>
  </div>
  <div class="flex" v-else>
    <p class="mb-16 text-xl font-thin">Noch keine Matches vorhanden.</p>
  </div>
</template>

<script lang="ts" setup>
import Button from "./ui/button/Button.vue";

const store = useBeerStore();
const { teams, matches } = storeToRefs(store);

const team1 = ref("null");
const team2 = ref("null");
</script>
