import { defineStore } from "pinia";
import type { Team } from "~/components/TeamComponent.vue";

type MatchData = {
  uuid: string;
  team1: {
    uuid: string;
    team_name: string;
    players: any[]; // Assuming players is an array of any type
  };
  team2: {
    uuid: string;
    team_name: string;
    players: any[]; // Assuming players is an array of any type
  };
  winner?: {
    uuid: string | null;
    team_name: string | null;
    players: any[];
  };
  draw: boolean;
  missingCups: number;
};

export const useBeerStore = defineStore("beerStore", () => {
  const matches = ref([] as Array<MatchData>);
  const players = ref([] as Array<{ name: string; uuid: string }>);
  const teams = ref([] as Array<Team>);

  const fetchMatches = async () => {
    const data = await $fetch<Array<MatchData>>("/api/get-matches", {
      method: "GET",
    });
    matches.value = data ? data : [];
  };

  const fetchTeams = async () => {
    const data = await $fetch<Array<Team>>("/api/get-teams", {
      method: "GET",
    });
    teams.value = data ? data : [];
  };

  const fetchPlayers = async () => {
    const data = await $fetch<Array<{ name: string; uuid: string }>>(
      "/api/get-players",
      {
        method: "GET",
      }
    );
    players.value = data ? data : [];
  };

  const createTeam = async (teamName: string) => {
    await $fetch("/api/create-team", {
      method: "POST",
      body: { teamName: teamName },
    });
    fetchTeams();
  };

  const createMatch = async (team1: string, team2: string) => {
    await $fetch("/api/create-match", {
      method: "POST",
      body: {
        team1: team1,
        team2: team2,
      },
    });
    await fetchMatches();
  };

  const createPlayer = async (belongsToTeam: string, playerName: string) => {
    await $fetch("/api/create-player", {
      method: "POST",
      body: {
        name: playerName,
        belongsToTeam: belongsToTeam,
      },
    });
    await fetchPlayers();
    await fetchTeams();
  };

  const assignToTeam = async (playerToTeam: string, belongsToTeam: string) => {
    await $fetch("/api/assign-player-to-team", {
      method: "POST",
      body: {
        uuid: playerToTeam,
        belongsToTeam: belongsToTeam,
      },
    });
    await fetchTeams();
  };

  if (matches.value.length === 0) {
    fetchMatches();
  }
  if (teams.value.length === 0) {
    fetchTeams();
  }
  if (players.value.length === 0) {
    fetchPlayers();
  }

  return {
    matches,
    players,
    teams,
    fetchMatches,
    fetchTeams,
    fetchPlayers,
    createTeam,
    createMatch,
    createPlayer,
    assignToTeam,
  };
});
