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
    <div
      class="bg-gray-400 rounded-md text-white flex-col p-2"
      v-for="match in data"
    >
      <div class="text-lg flex justify-between">
        <span>{{ match.team1.teamName }}</span
        ><span>vs.</span>
        <span>{{ match.team2.teamName }}</span>
      </div>
      <div class="flex flex-col justify-between gap-3">
        <div class="flex justify-between gap-3">
          <div class="flex flex-col">
            <label for="">Team 1</label>
            <select v-model="teamGiven1">
              <option value="null" disabled>Team 1...</option>
              <option v-for="team in teams" :value="team.uuid">
                {{ team.team_name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col">
            <label for="">Team 2</label>
            <select v-model="teamGiven2">
              <option value="null" disabled>Team 2...</option>
              <option v-for="team in teams" :value="team.uuid">
                {{ team.team_name }}
              </option>
            </select>
          </div>
          <div class="flex flex-col" v-if="!isDraw">
            <label for="">Gewinner</label>
            <select name="" id="" v-model="winner">
              <option v-for="team in teams" :value="team.uuid">
                {{ team.team_name }}
              </option>
            </select>
          </div>
        </div>

        <div class="flex gap-3 flex-col">
          <div class="flex gap-3 justify-between">
            <label for="">Unentschieden?</label>
            <input type="checkbox" v-model="isDraw" class="accent-green-700" />
          </div>
          <div class="flex gap-3 justify-between">
            <label for="">Fehlende Becher</label>
            <input
              type="number"
              v-model="missingCups"
              class="p-1 rounded-md"
              placeholder="Fehlende Becher"
            />
          </div>
          <button @click="updateMatch(match.uuid)">Match updaten</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "./TeamComponent.vue";

const match = ref("");
const team1 = ref("null");
const team2 = ref("null");

const teamGiven1 = ref("null");
const teamGiven2 = ref("null");
const winner = ref("null");
const isDraw = ref(false);
const missingCups = ref(0);

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

const updateMatch = async (uuid: string) => {
  await useFetch("/api/update-match", {
    method: "POST",
    body: {
      uuid,
      team1: teamGiven1.value,
      team2: teamGiven2.value,
      winner: winner.value,
      isDraw: isDraw.value,
      missingCups: missingCups.value,
    },
  });
  await refresh();
};
</script>
