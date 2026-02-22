"use server";

import prisma from "@/lib/prisma";

export interface SuccessStory {
    id: string;
    name: string;
    role: string;
    company: string;
    ctc: string;
    quote: string;
    image: string | null;
    tags: string[];
    batch: string;
    createdAt: Date;
}

export async function getSuccessStories(): Promise<SuccessStory[]> {
    try {
        const stories = await prisma.successStory.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });

        return (stories as any[]).map((story) => ({
            id: story.id,
            name: story.name,
            role: story.role,
            company: story.company,
            ctc: story.ctc,
            quote: story.quote,
            image: story.image,
            tags: (story.tags as string).split(',').map((tag: string) => tag.trim()),
            batch: story.batch,
            createdAt: story.createdAt
        }));
    } catch (error) {
        console.error("Error fetching success stories:", error);
        return [];
    }
}
