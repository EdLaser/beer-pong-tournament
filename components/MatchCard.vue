<template>
  <div class="ring-2 ring-gray-400 rounded-md flex-col p-2">
    <div class="text-xl flex justify-between mb-5">
      <span>{{ team1.team_name }}</span
      ><span>vs.</span>
      <span>{{ team2.team_name }}</span>
    </div>
    <div class="flex flex-col justify-between gap-3">
      <div class="flex justify-between gap-3">
        <div class="flex flex-col gap-1">
          <label for="">Team 1</label>
          <select
            class="rounded-md ring-1 ring-gray-400 p-1"
            v-model="teamGiven1"
          >
            <option value="null" disabled>Team 1...</option>
            <option v-for="team in teams" :value="team.uuid">
              {{ team.team_name }}
            </option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="">Team 2</label>
          <select
            class="rounded-md ring-1 ring-gray-400 p-1"
            v-model="teamGiven2"
          >
            <option value="null" disabled>Team 2...</option>
            <option v-for="team in teams" :value="team.uuid">
              {{ team.team_name }}
            </option>
          </select>
        </div>
      </div>
      <div class="flex flex-col gap-1" v-if="!isDraw">
        <label for="">Gewinner</label>
        <select
          class="rounded-md ring-1 ring-gray-400 p-1"
          name=""
          id=""
          v-model="winner"
        >
          <option value="null" disabled>Gewinner...</option>
          <option :value="team1.uuid">
            {{ team1.team_name }}
          </option>
          <option :value="team2.uuid">
            {{ team2.team_name }}
          </option>
        </select>
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
            class="rounded-md ring-1 ring-gray-400 p-1"
            placeholder="Fehlende Becher"
          />
        </div>
        <button
          class="bg-gray-400 rounded-md p-1 text-white"
          @click="updateMatch(props.uuid)"
        >
          Match updaten
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "./TeamComponent.vue";

const props = defineProps<{
  uuid: string;
  team1: Team;
  team2: Team;
  winner?: Team | null;
  isDraw?: boolean | null;
  missingCups?: number | null;
}>();

const teamGiven1 = ref(props.team1.uuid);
const teamGiven2 = ref(props.team2.uuid);
const winner = ref(props.winner ? props.winner : "null");
const isDraw = ref(props.isDraw ? props.isDraw : false);
const missingCups = ref(props.missingCups ? props.missingCups : 0);

const {
  data: teams,
  pending: pen,
  refresh,
} = await useFetch<Array<Team>>("/api/get-teams", {
  method: "GET",
});

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
console.log(winner.value);
</script>
