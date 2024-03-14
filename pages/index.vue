<template>
  <h1 class="text-5xl/normal text-center mb-20">
    Dein Beerpong Turnier <Icon name="fluent-emoji-flat:beer-mug" />
  </h1>
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

useHead({
  title: "Beerpong Turnier",
  link: [
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },
  ],
});
</script>
