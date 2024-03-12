<template>
  <h1 class="text-5xl/normal text-center mb-20">Dein Beerpong Tournier</h1>
  <TeamComponent />
  <PlayerComponent />
  <MatchComponent />
</template>
<script setup lang="ts">
type Team = {
  name: string;
  members: Array<string>;
};

const teams = ref<Array<Team>>([] as Array<Team>);
</script>
