export default defineEventHandler(async (event) => {
  const data = await usePrisma(event).players.findMany({
    select: {
      name: true,
    },
  });
  return data;
});
