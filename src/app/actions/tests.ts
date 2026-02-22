"use server";

import prisma from "@/lib/prisma";

export async function getMockTests() {
    try {
        const tests = await prisma.mockTest.findMany({
            include: {
                questions: {
                    include: {
                        options: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        return tests;
    } catch (error) {
        console.error("Error fetching tests:", error);
        return [];
    }
}
