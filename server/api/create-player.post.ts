import { usePrisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, belongsToTeam } = body;
  console.log(name, belongsToTeam);
  const data = await usePrisma(event).players.create({
    data: {
      name,
      in_team: belongsToTeam,
    },
  });

  return 200;
});
