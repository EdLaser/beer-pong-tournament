<template>
  <div class="ring-2 ring-gray-400 rounded-md flex-col p-2">
    <h2 class="text-3xl">Matchnr. {{ nummer }}</h2>
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
          <option :value="winner" v-if="winner !== ''">
            {{ props.winner?.team_name }}
          </option>
        </select>
      </div>
      <div class="flex gap-3 flex-col">
        <div class="flex gap-3 justify-between">
          <label for="">Unentschieden?</label>
          <input type="checkbox" v-model="isDraw" class="accent-green-700" />
        </div>
        <div class="flex gap-3 justify-between">
          <label for="missingCupsTeam1">Fehlende Becher</label>
          <Input
            type="number"
            v-model="missingCupsTeam1"
            class="rounded-md ring-1 ring-gray-400 p-1"
            placeholder="Fehlende Becher"
            id="missingCupsTeam1"
          />
          <label for="missingCupsTeam2">Fehlende Becher</label>
          <Input
            type="number"
            v-model="missingCupsTeam1"
            class="rounded-md ring-1 ring-gray-400 p-1"
            placeholder="Fehlende Becher"
            id="missingCupsTeam2"
          />
        </div>
        <Button
          class="bg-violet-700 rounded-md p-1 text-white"
          @click="updateMatch(props.uuid)"
        >
          Match updaten
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { Team } from "./TeamComponent.vue";
import Button from "./ui/button/Button.vue";

const props = defineProps<{
  nummer: number;
  uuid: string;
  team1: Team;
  team2: Team;
  winner?: Team | null;
  isDraw?: boolean | null;
  missingCupsTeam1?: number | null;
  missingCupsTeam2?: number | null;
}>();

const teamGiven1 = ref(props.team1.uuid);
const teamGiven2 = ref(props.team2.uuid);
const winner = ref(props.winner?.uuid ? props.winner.uuid : "");
const isDraw = ref(props.isDraw ? props.isDraw : false);
const missingCupsTeam1 = ref(
  props.missingCupsTeam1 ? props.missingCupsTeam1 : 0
);
const missingCupsTeam2 = ref(
  props.missingCupsTeam2 ? props.missingCupsTeam2 : 0
);

const {
  data: teams,
  pending: pen,
  refresh,
} = await useFetch<Array<Team>>("/api/get-teams", {
  method: "GET",
});

const updateMatch = async (uuid: string) => {
  console.log(winner.value);
  await useFetch("/api/update-match", {
    method: "POST",
    body: {
      uuid,
      team1: teamGiven1.value,
      team2: teamGiven2.value,
      winner: winner.value,
      isDraw: isDraw.value,
      missingCupsTeam1: missingCupsTeam1.value,
      missingCupsTeam2: missingCupsTeam2.value,
    },
  });
  await refresh();
};
console.log(winner.value);
</script>
