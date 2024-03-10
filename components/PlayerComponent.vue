<template>
  <h1 class="text-2xl/normal">Players</h1>
  <div class="flex flex-col gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <div class="flex gap-3">
      <input
        type="text"
        class="p-1 rounded-md"
        placeholder="Playername"
        v-model="playerName"
      />
      <select v-model="belongsToTeam">
        <option value="null">Gehört ins Team...</option>
        <option v-for="team in teams" :value="team.uuid">
          {{ team.team_name }}
        </option>
      </select>
    </div>
    <button
      @click="createPlayer()"
      class="bg-gray-400 p-1 rounded-md text-white mb-6"
    >
      Player erstellen
    </button>
    <div class="flex flex-col gap-3">
      <h4 class="text-xl">Alle Spieler:</h4>
      <select v-if="players?.length > 0">
        <option v-for="player in players" :value="player">{{ player }}</option>
      </select>
      <p v-else>Keine Spieler vorhanden</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "./TeamComponent.vue";

const playerName = ref("");
const belongsToTeam = ref("null");

const createPlayer = async () => {
  if (belongsToTeam.value === "null") {
    return;
  }
  await useFetch("/api/create-player", {
    method: "POST",
    body: {
      playerName: playerName.value,
      belongsToTeam: belongsToTeam.value,
    },
  });
  refreshPlayers();
  refreshPlayers();
};

const { data: players, refresh: refreshPlayers } = await useFetch<
  Array<string>
>("/api/get-players", {
  method: "GET",
});

const {
  data: teams,
  pending,
  error,
  refresh: refreshTeams,
} = await useFetch<Array<Team>>("/api/get-teams", {
  method: "GET",
});
</script>
