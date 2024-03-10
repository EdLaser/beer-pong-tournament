import { usePrisma } from "../utils/prisma";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { name, in_team } = body;

  const data = usePrisma(event).players.create({
    data: {
      name,
      in_team,
    },
  });

  return 200;
});
