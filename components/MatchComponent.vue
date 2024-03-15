<template>
  <h1 class="text-5xl/normal mt-16">
    Matches <Icon name="arcticons:litmatch" />
  </h1>
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
  <div class="flex flex-col gap-3 opacity-75">
    <h3 class="text-2xl">Match Vorschläge</h3>
    <div class="flex flex-col gap-3">
      <!-- Iterate Groups and teams per group, create Matchcard for teams in group. Defferenciate for Groups with teams count !== % 2 === 0  -->
      <MatchCard
        v-for="(match, index) in matchesPerGroup"
        :nummer="index + 1"
        :uuid="'group-' + index"
        :team1="match.team1"
        :team2="match.team2"
        :winner="match.winner"
        :is-draw="match.draw"
        :missing-cups-team1="match.missingCupsTeam1"
        :missing-cups-team2="match.missingCupsTeam2"
      />
    </div>
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
import type { Team } from "./TeamComponent.vue";
import Button from "./ui/button/Button.vue";

const store = useBeerStore();
const { teams, matches, calculatedGroups } = storeToRefs(store);

const createMatchesPerGroup = (group: { name: string; teams: Team[] }) => {
  const teams = group.teams;
  const matches = [];
  for (let i = 0; i < teams.length; i++) {
    for (let j = i + 1; j < teams.length; j++) {
      matches.push({
        team1: teams[i],
        team2: teams[j],
        winner: null,
        draw: false,
        missingCups: 0,
      });
    }
  }
  return matches;
};
const matchesPerGroup = ref();

watch(calculatedGroups, (groups) => {
  matchesPerGroup.value = groups.map(createMatchesPerGroup);
  console.log(matchesPerGroup.value);
});

const team1 = ref("null");
const team2 = ref("null");
</script>
