import { usePrisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, belongsToTeam } = <{ name: string; belongsToTeam: string }>body;
  const data = await usePrisma(event).players.create({
    data: {
      name: name.trim(),
      in_team: belongsToTeam,
    },
  });

  return 200;
});
