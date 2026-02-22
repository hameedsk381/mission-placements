"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function getStudentData() {
    const session = await auth();
    if (!session?.user?.id) return null;

    const data = await prisma.user.findUnique({
        where: { id: session.user.id },
        include: {
            metrics: true,
            submissions: {
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: {
                    test: true
                }
            }
        }
    });

    return data;
}
