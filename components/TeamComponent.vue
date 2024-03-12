<template>
  <h1 class="text-5xl/normal">
    Teams <Icon name="fluent:people-community-28-regular" />
  </h1>
  <div class="flex gap-3 ring-2 ring-gray-400 rounded-md p-2 mb-10">
    <Input
      type="text"
      class="p-1 rounded-md"
      placeholder="Teamname..."
      v-model="teamName"
    />
    <Button
      @click="async () => await store.createTeam(teamName)"
      class="bg-violet-700 p-1 rounded-md text-white"
    >
      Team erstellen
    </Button>
  </div>
  <div class="flex flex-col mb-6">
    <label for="groupSize">Gruppengröße</label>
    <div class="flex w-1/2 gap-2">
      <Input id="groupSize" v-model="groupSize" class="p-1 rounded-md" />
      <div class="flex gap-1 w-1/2">
        <Button @click="groupSize++">+</Button>
        <Button @click="handleGroupSize()">-</Button>
      </div>
    </div>
  </div>
  <div
    class="flex flex-col ring-2 ring-gray-400 rounded-md p-2 mb-4"
    v-for="group in calculatedGroups"
  >
    <h4 class="text-3xl mb-2">{{ group.name }}</h4>
    <div class="grid grid-cols-2 gap-2">
      <div
        class="rounded-md text-white flex-col p-2"
        :class="determineColor(index)"
        v-for="(team, index) in group.teams"
      >
        <h3 class="text-2xl">{{ team.team_name }}</h3>
        <div>
          <p>Bierkrieger im Team:</p>
          <div class="space-x-2 mt-3" v-if="team.players.length > 0">
            <span
              class="text-lg font-bold"
              v-for="(player, index) in team.players"
              >{{ player.name }}{{ index + 1 < team.players.length ? "," : "" }}
            </span>
          </div>
          <p class="text-sm mt-3" v-else>Noch keine Krieger.</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Button from "./ui/button/Button.vue";
import { toast } from "./ui/toast";

export type Team = {
  uuid: string;
  team_name: string;
  players: Array<{ name: string }>;
};

const store = useBeerStore();
const { groupSize, calculatedGroups } = storeToRefs(store);
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

const handleGroupSize = () => {
  if (groupSize.value === 2) {
    toast({ description: "Gruppen kleiner 2, echt?" });
  } else {
    groupSize.value--;
  }
};
</script>
