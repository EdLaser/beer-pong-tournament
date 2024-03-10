import { PrismaClient } from "@prisma/client";

let prismaClient: PrismaClient;

export const usePrisma = (event: any) => {
  if (!prismaClient) {
    prismaClient = new PrismaClient({});
  }

  return prismaClient;
};
