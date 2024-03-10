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
        <option value="null" disabled>Gehört ins Team...</option>
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
      <div class="flex gap-5 w-full flex-wrap" v-if="players?.length > 0">
        <select v-model="playerToTeam">
          <option value="">Spieler auswählen...</option>
          <option v-for="player in players" :value="player.uuid">
            {{ player.name }}
          </option>
        </select>
        <select v-model="belongsToTeam">
          <option value="null" disabled>Gehört ins Team...</option>
          <option v-for="team in teams" :value="team.uuid">
            {{ team.team_name }}
          </option>
        </select>
        <button
          @click="assignToTeam()"
          class="bg-gray-400 p-1 rounded-md text-white"
        >
          In Team zuweisen
        </button>
      </div>
      <p v-else>Keine Spieler vorhanden</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "./TeamComponent.vue";

const playerName = ref("");
const belongsToTeam = ref("null");
const playerToTeam = ref("");

const createPlayer = async () => {
  if (belongsToTeam.value === "null") {
    return;
  }
  await useFetch("/api/create-player", {
    method: "POST",
    body: {
      name: playerName.value,
      belongsToTeam: belongsToTeam.value,
    },
  });
  await refreshPlayers();
  await refreshTeams();
};

const assignToTeam = async () => {
  await useFetch("/api/assign-player-to-team", {
    method: "POST",
    body: {
      uuid: playerToTeam.value,
      belongsToTeam: belongsToTeam.value,
    },
  });
  await refreshPlayers();
  await refreshTeams();
};

const { data: players, refresh: refreshPlayers } = await useFetch<
  Array<{ name: string; uuid: string }>
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
