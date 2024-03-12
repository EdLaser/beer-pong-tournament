export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const teamName = body.teamName;
  if (!teamName) {
    return new Response("Missing team name", { status: 400 });
  }
  const data = await usePrisma(event).teams.create({
    data: {
      team_name: teamName.trim(),
    },
  });
  return 200;
});
