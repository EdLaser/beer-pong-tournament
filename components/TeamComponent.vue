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
      class="rounded-md text-white flex-col p-2"
      :class="determineColor(index)"
      v-for="(team, index) in teams"
    >
      <h3 class="text-2xl">{{ team.team_name }}</h3>
      <div v-if="team.players?.length > 0">
        <p>Spieler im Team:</p>
        <div class="space-x-2 mt-3">
          <span
            class="text-lg font-bold"
            v-for="(player, index) in team.players"
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

const determineColor = (index: number) => {
  if (index === 0 || index === 2 || index === 4) {
    return "bg-pink-500";
  } else if (index === 1 || index === 3 || index === 5) {
    return "bg-emerald-600";
  } else {
    return "bg-violet-700";
  }
};
</script>
