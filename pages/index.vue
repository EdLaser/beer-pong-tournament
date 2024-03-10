<template>
  <h1 class="text-4xl/normal text-center mb-20">Beerpong Tournament</h1>
  <TeamComponent />
  <PlayerComponent />
</template>
<script setup lang="ts">
type Team = {
  name: string;
  members: Array<string>;
};

const teams = ref<Array<Team>>([] as Array<Team>);
</script>
