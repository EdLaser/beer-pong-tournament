export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const data = await usePrisma(event).matches.update({
    where: {
      uuid: body.uuid,
    },
    data: {
      team_1: body.team1,
      team_2: body.team2,
      winner: body.winner,
      draw: body.isDraw,
      missing_cups: body.missingCups,
    },
  });
  console.log(data);
  return 200;
});
