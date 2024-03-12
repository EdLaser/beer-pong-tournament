export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const data = await usePrisma(event).matches.create({
    data: {
      team_1: body.team1,
      team_2: body.team2,
    },
  });
  return 200;
});
