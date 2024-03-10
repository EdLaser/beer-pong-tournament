import { usePrisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { uuid, belongsToTeam } = body;

  const data = await usePrisma(event).players.update({
    where: { uuid },
    data: {
      in_team: belongsToTeam,
    },
  });

  return 200;
});
