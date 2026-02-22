"use server";

import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function submitTest(testId: string, answers: Record<string, string>) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");

    const test = await prisma.mockTest.findUnique({
        where: { id: testId },
        include: { questions: true }
    });

    if (!test) throw new Error("Test not found");

    let correctCount = 0;
    test.questions.forEach(q => {
        if (answers[q.id] === q.correctOpt) {
            correctCount++;
        }
    });

    const score = (correctCount / test.questions.length) * 100;

    const submission = await prisma.submission.create({
        data: {
            userId: session.user.id,
            testId,
            score,
            answers: JSON.stringify(answers),
        }
    });

    // Calculate some dummy stats for the "Finished" view
    return {
        submissionId: submission.id,
        score: score.toFixed(1),
        accuracy: score.toFixed(1),
        speed: score > 80 ? "Elite" : score > 60 ? "Pro" : "Developing",
        rankDelta: Math.floor(score / 10) + 2
    };
}
