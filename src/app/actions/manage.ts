"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createSuccessStory(data: {
    name: string;
    role: string;
    company: string;
    ctc: string;
    quote: string;
    tags: string;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role;

    if (!session || role !== "MANAGER") {
        throw new Error("Unauthorized: Only managers can publish stories.");
    }

    try {
        const story = await prisma.successStory.create({
            data: {
                ...data,
                batch: "2024",
            },
        });

        revalidatePath("/success-stories");
        revalidatePath("/achievements");
        return { success: true, story };
    } catch (error) {
        console.error("Failed to create success story:", error);
        throw new Error("Internal Server Error");
    }
}

export async function createResource(data: {
    title: string;
    type: string;
    category: string;
    link: string;
    description: string;
}) {
    const session = await auth();
    const role = (session?.user as any)?.role;

    if (!session || role !== "MANAGER") {
        throw new Error("Unauthorized: Only managers can deploy resources.");
    }

    try {
        const resource = await prisma.resource.create({
            data: {
                ...data,
                size: "1.2 MB",
                date: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                iconName: data.type.toUpperCase() === "VIDEO" ? "Play" :
                    data.type.toUpperCase() === "PDF" ? "FileText" : "Terminal",
            },
        });

        revalidatePath("/resources");
        return { success: true, resource };
    } catch (error) {
        console.error("Failed to create resource:", error);
        throw new Error("Internal Server Error");
    }
}

