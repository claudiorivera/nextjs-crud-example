import { PrismaClient } from "@prisma/client";

declare global {
	// biome-ignore lint/style/noVar: https://github.com/biomejs/biome/pull/1669
	var prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export const db = global.prisma || new PrismaClient();
