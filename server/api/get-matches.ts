export default defineEventHandler(async (event) => {
  const data = await usePrisma(event).matches.findMany({
    select: {
      uuid: true,
      winner: true,
      draw: true,
      missing_cups_team_1: true,
      missing_cups_team_2: true,
      teams_matches_team_1Toteams: {
        select: {
          team_name: true,
          uuid: true,
          players: {
            select: {
              name: true,
              uuid: true,
            },
          },
        },
      },
      teams_matches_team_2Toteams: {
        select: {
          team_name: true,
          uuid: true,
          players: {
            select: {
              name: true,
              uuid: true,
            },
          },
        },
      },
      teams_matches_winnerToteams: {
        select: {
          team_name: true,
          uuid: true,
          players: {
            select: {
              name: true,
              uuid: true,
            },
          },
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });
  const matches = data.reduce((acc: any, match) => {
    const team1 = match.teams_matches_team_1Toteams;
    const team2 = match.teams_matches_team_2Toteams;
    const winner = match.teams_matches_winnerToteams;
    acc.push({
      uuid: match.uuid,
      team1: {
        uuid: team1.uuid,
        team_name: team1.team_name,
        players: team1.players,
      },
      team2: {
        uuid: team2.uuid,
        team_name: team2.team_name,
        players: team2.players,
      },
      winner: {
        uuid: winner?.uuid,
        team_name: winner?.team_name,
      },
      draw: match.draw,
      missingCupsTeam1: match.missing_cups_team_1,
      missingCupsTeam2: match.missing_cups_team_2,
    });
    return acc;
  }, []);

  return matches;
});
