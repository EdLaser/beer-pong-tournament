<template>
  <h1 class="text-5xl/normal">Players</h1>
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
      @click="async () => store.createPlayer(belongsToTeam, playerName)"
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
          @click="
            async () => await store.assignToTeam(playerToTeam, belongsToTeam)
          "
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
const store = useBeerStore();
const { players, teams } = storeToRefs(store);

const playerName = ref("");
const belongsToTeam = ref("null");
const playerToTeam = ref("");
</script>
