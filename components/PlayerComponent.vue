<template>
  <h1 class="text-5xl/normal">Spieler <Icon name="arcticons:taskwarrior" /></h1>
  <div class="flex flex-col gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <div class="flex gap-3 justify-between">
      <Input
        type="text"
        class="p-1 rounded-md"
        placeholder="Spielername..."
        v-model="playerName"
      />
      <select
        v-model="belongsToTeam"
        class="rounded-md ring-1 ring-gray-400 p-1"
      >
        <option value="null" disabled>Gehört ins Team...</option>
        <option v-for="team in teams" :value="team.uuid">
          {{ team.team_name }}
        </option>
      </select>
    </div>
    <Button
      @click="async () => store.createPlayer(belongsToTeam, playerName)"
      class="bg-violet-700 p-1 rounded-md text-white"
    >
      Spieler erstellen
    </Button>
  </div>
  <div
    class="flex flex-col gap-3 mb-16 ring-2 ring-gray-400 rounded-md p-2"
    v-if="players?.length > 0"
  >
    <h4 class="text-xl">Alle Spieler:</h4>
    <div class="flex gap-5 w-full justify-between">
      <select
        v-model="playerToTeam"
        class="rounded-md ring-1 ring-gray-400 p-1"
      >
        <option value="">Spieler auswählen...</option>
        <option v-for="player in players" :value="player.uuid">
          {{ player.name }}
        </option>
      </select>
      <select
        v-model="belongsToTeam"
        class="rounded-md ring-1 ring-gray-400 p-1"
      >
        <option value="null" disabled>Gehört ins Team...</option>
        <option v-for="team in teams" :value="team.uuid">
          {{ team.team_name }}
        </option>
      </select>
    </div>
    <Button
      @click="async () => await store.assignToTeam(playerToTeam, belongsToTeam)"
      class="bg-violet-700 p-1 rounded-md text-white"
    >
      In Team zuweisen
    </Button>
  </div>
  <div class="flex" v-else>
    <p class="mb-16 text-xl font-thin">Noch keine Spieler vorhanden.</p>
  </div>
</template>

<script lang="ts" setup>
const store = useBeerStore();
const { players, teams } = storeToRefs(store);

const playerName = ref("");
const belongsToTeam = ref("null");
const playerToTeam = ref("");
</script>
