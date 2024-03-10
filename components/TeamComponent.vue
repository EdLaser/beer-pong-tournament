<template>
  <h1 class="text-2xl/normal">Teams</h1>
  <div class="flex gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <input
      type="text"
      class="p-1 rounded-md"
      placeholder="Teamname"
      v-model="teamName"
    />
    <button @click="createTeam()" class="bg-gray-400 p-1 rounded-md text-white">
      Team erstellen
    </button>
  </div>
  <div class="grid grid-cols-2 gap-2">
    <div
      class="bg-gray-400 rounded-md text-white flex-col p-2"
      v-for="team in data"
    >
      <h3>{{ team.team_name }}</h3>
      <ul>
        <li v-for="member in team.members">{{ member }}</li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
type Team = {
  team_name: string;
  members: Array<string>;
};

const createTeam = async () => {
  await useFetch("/api/create-team", {
    method: "POST",
    body: JSON.stringify({ teamName: teamName.value }),
  });
};

const teamName = ref("");

const { data, pending, error, refresh } = await useFetch<Array<Team>>(
  "/api/get-teams",
  {
    method: "GET",
  }
);
console.log(data);
</script>
