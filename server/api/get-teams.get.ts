import { usePrisma } from "../utils/prisma";

export default defineEventHandler((event) => {
  const data = usePrisma(event).teams.findMany({
    select: {
      uuid: true,
      team_name: true,
      players: {
        select: {
          name: true,
        },
      },
    },
  });
  return data;
});
