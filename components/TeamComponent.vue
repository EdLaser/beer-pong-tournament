<template>
  <h1 class="text-5xl/normal">Teams</h1>
  <div class="flex flex-col gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <input
      type="text"
      class="p-1 rounded-md"
      placeholder="Teamname"
      v-model="teamName"
    />
    <button
      @click="async () => await store.createTeam(teamName)"
      class="bg-gray-400 p-1 rounded-md text-white"
    >
      Team erstellen
    </button>
  </div>
  <div class="grid grid-cols-2 gap-2 mb-16">
    <div
      class="bg-gray-400 rounded-md text-white flex-col p-2"
      v-for="team in teams"
    >
      <h3 class="text-xl">{{ team.team_name }}</h3>
      <div v-if="team.players?.length > 0">
        <p>Spieler im Team:</p>
        <div class="space-x-2">
          <span v-for="(player, index) in team.players"
            >{{ player.name }}{{ index + 1 < team.players.length ? "," : null }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
export type Team = {
  uuid: string;
  team_name: string;
  players: Array<{ name: string }>;
};

const store = useBeerStore();
const { teams } = storeToRefs(store);

const teamName = ref("");
</script>
