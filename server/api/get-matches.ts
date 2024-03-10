export default defineEventHandler(async (event) => {
  const data = await usePrisma(event).matches.findMany({
    select: {
      uuid: true,
      winner: true,
      draw: true,
      missing_cups: true,
      teams_matches_team_1Toteams: {
        select: {
          team_name: true,
          uuid: true,
        },
      },
      teams_matches_team_2Toteams: {
        select: {
          team_name: true,
          uuid: true,
        },
      },
      teams_matches_winnerToteams: {
        select: {
          team_name: true,
          uuid: true,
        },
      },
    },
  });
  console.log(data);
  const matches = data.reduce((acc, match) => {
    const team1 = match.teams_matches_team_1Toteams;
    const team2 = match.teams_matches_team_2Toteams;
    const winner = match.teams_matches_winnerToteams;
    acc.push({
      uuid: match.uuid,
      team1: {
        uuid: team1.uuid,
        teamName: team1.team_name,
      },
      team2: {
        uuid: team2.uuid,
        teamName: team2.team_name,
      },
      winner: {
        uuid: winner?.uuid,
        teamName: winner?.team_name,
      },
      draw: match.draw,
      missingCups: match.missing_cups,
    });
    return acc;
  }, []);

  return matches;
});
