export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  console.log(body);
  const data = await usePrisma(event).matches.create({
    data: {
      team_1: body.team1,
      team_2: body.team2,
    },
  });
  console.log(data);
  return 200;
});
