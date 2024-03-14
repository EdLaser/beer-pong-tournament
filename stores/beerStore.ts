import { defineStore } from "pinia";
import type { Team } from "~/components/TeamComponent.vue";
import { useToast } from "@/components/ui/toast/use-toast";

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

const checkForEmtpyInput = (values: Array<any>) => {
  for (const value of values) {
    if (value === "" || value === null || value === undefined) {
      return true;
    }
  }
  return false;
};

const colors = [
  "bg-red-700",
  "bg-blue-700",
  "bg-emerald-700",
  "bg-cyan-700",
  "bg-indigo-700",
  "bg-violet-700",
  "bg-purple-700",
  "bg-fuchsia-700",
];

export const useBeerStore = defineStore("beerStore", () => {
  const { toast } = useToast();
  const matches = ref([] as Array<MatchData>);
  const players = ref([] as Array<{ name: string; uuid: string }>);
  const teams = ref([] as Array<Team>);

  const groupSize = ref(2);
  const calculatedGroups = computed(() => {
    return generateGroups(teams.value, groupSize.value);
  });

  const optimalGroupNumber = computed(() => {
    // Start with the square root of the total number of teams as the base for the number of groups
    let baseGroups = Math.sqrt(teams.value.length);

    // Example adjustment rule: If the square root is not an integer, check the scenarios for rounding up and down
    if (!Number.isInteger(baseGroups)) {
      let lowerGroups = Math.floor(baseGroups); // Option 1: Less groups, more members per group
      let higherGroups = Math.ceil(baseGroups); // Option 2: More groups, fewer members per group

      // Check which option has the least number of teams in the largest group
      let lowerMaxTeams = Math.ceil(teams.value.length / lowerGroups);
      let higherMaxTeams = Math.ceil(teams.value.length / higherGroups);

      // Choose the option that minimizes the number of teams in the largest group
      baseGroups = lowerMaxTeams <= higherMaxTeams ? lowerGroups : higherGroups;
    }

    return baseGroups;
  });

  const teamColors = computed(() => {
    const teamColors: { [key: number]: string } = {};
    for (let i = 0; i < teams.value.length; i++) {
      teamColors[i] = colors[Math.floor(Math.random() * colors.length)];
    }
    return teamColors;
  });

  const generateGroups = (teams: Array<Team>, groupSize: number) => {
    const groups: Array<{
      name: string;
      teams: Array<Team>;
    }> = [];

    const amountOfGroups = Math.ceil(teams.length / groupSize);

    for (let i = 0; i < amountOfGroups; i++) {
      groups.push({
        name: `Gruppe ${i + 1}`,
        teams: teams.slice(i * groupSize, i * groupSize + groupSize),
      });
    }
    return groups;
  };

  const fetchMatches = async () => {
    const data = await $fetch<Array<MatchData>>("/api/get-matches", {
      method: "GET",
    });
    matches.value = data ?? [];
  };

  const fetchTeams = async () => {
    const data = await $fetch<Array<Team>>("/api/get-teams", {
      method: "GET",
    });
    teams.value = data ?? [];
  };

  const fetchPlayers = async () => {
    const data = await $fetch<Array<{ name: string; uuid: string }>>(
      "/api/get-players",
      {
        method: "GET",
      }
    );
    players.value = data ?? [];
  };

  const createTeam = async (teamName: string) => {
    if (teamName === "" || teamName === null || teamName === undefined) {
      toast({ description: "Gib einen Teamnamen ein!" });
    }
    await $fetch("/api/create-team", {
      method: "POST",
      body: { teamName: teamName },
    });
    fetchTeams();
  };

  const createMatch = async (team1: string, team2: string) => {
    if (team1 === "null" || team2 === "null") {
      toast({ description: "Wähle zwei Teams aus!" });
    }
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
    if (playerName === "") {
      toast({ description: "Gib einen Spielernamen ein!" });
    } else if (belongsToTeam === "null") {
      toast({ description: "Wähle ein Team aus!" });
    }
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
    if (checkForEmtpyInput([playerToTeam, belongsToTeam])) {
      return;
    }
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
    groupSize,
    calculatedGroups,
    optimalGroupNumber,
    teamColors,
    fetchMatches,
    fetchTeams,
    fetchPlayers,
    createTeam,
    createMatch,
    createPlayer,
    assignToTeam,
  };
});
