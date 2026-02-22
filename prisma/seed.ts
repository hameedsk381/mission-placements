import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    console.log('Starting seed...')

    const hashedPassword = await bcrypt.hash('password123', 10)

    // 1. Users
    const manager = await prisma.user.upsert({
        where: { email: 'manager@missionplacements.com' },
        update: { password: hashedPassword },
        create: {
            email: 'manager@missionplacements.com',
            name: 'Adithya Y.',
            role: 'MANAGER',
            password: hashedPassword,
        },
    })

    const student = await prisma.user.upsert({
        where: { email: 'student@missionplacements.com' },
        update: { password: hashedPassword },
        create: {
            email: 'student@missionplacements.com',
            name: 'John Doe',
            role: 'STUDENT',
            password: hashedPassword,
            metrics: {
                create: {
                    globalRank: 124,
                    successRate: 85.5,
                    problemsSolved: 450,
                    studyHours: 120.5,
                }
            }
        },
    })

    // 2. Success Stories
    const stories = [
        {
            name: "Adwaith S.",
            role: "System Engineer",
            company: "TCS",
            ctc: "7.0 LPA",
            quote: "The consistent mock tests and faculty reviews were the game changer for my preparation. Focus on the core fundamentals.",
            tags: "Digital, Aptitude Pro",
            batch: "2024",
        },
        {
            name: "Sneha Nair",
            role: "Software Developer",
            company: "Infosys",
            ctc: "9.5 LPA",
            quote: "Don't just code, understand the 'Why' behind every algorithm. Mission Placements' resources helped me bridge the gap.",
            tags: "Specialist, Logic Master",
            batch: "2024",
        },
        {
            name: "Rishi Kumar",
            role: "Associate Engineer",
            company: "Cognizant",
            ctc: "6.5 LPA",
            quote: "The Roadmap (Phase 03) was exactly what I needed to master technical rounds. Stay consistent with the daily polls.",
            tags: "GenC Next, DBMS Expert",
            batch: "2024",
        },
        {
            name: "Meghana P.",
            role: "Graduate Trainee",
            company: "Wipro",
            ctc: "5.0 LPA",
            quote: "Mock Interviews gave me the confidence to face the real panel. The feedback loop is essential.",
            tags: "Elite, Communication",
            batch: "2024",
        }
    ]

    // Clear existing stories to avoid duplicates on re-seed
    await prisma.successStory.deleteMany({})
    for (const story of stories) {
        await prisma.successStory.create({ data: story })
    }

    // 3. Resources
    const resources = [
        {
            title: "Quantitative Aptitude Cheat Sheet",
            category: "aptitude",
            type: "PDF",
            description: "Fast-track formulas for Time, Work, Distance, and Percentages.",
            link: "#",
            size: "2.4 MB",
            date: "Feb 2026",
            iconName: "FileText",
        },
        {
            title: "Technical Interview Question Bank",
            category: "interview",
            type: "Doc",
            description: "Top 50 OOPS and DBMS questions asked in MNC rounds.",
            link: "#",
            size: "1.1 MB",
            date: "Jan 2026",
            iconName: "BookMarked",
        },
        {
            title: "Clean Code & Data Structures Patterns",
            category: "coding",
            type: "Snippet",
            description: "Essential logic patterns for cracking coding assessments.",
            link: "#",
            size: "15 KB",
            date: "Feb 2026",
            iconName: "Terminal",
        }
    ]

    await prisma.resource.deleteMany({})
    for (const res of resources) {
        await prisma.resource.create({ data: res })
    }

    // 4. Mock Tests
    const tests = [
        {
            title: "NQT Cognitive",
            company: "TCS",
            duration: 60,
            questions: {
                create: [
                    {
                        text: "If a sum of money doubles itself at compound interest in 15 years, it will become eight times of itself in how many years?",
                        options: {
                            create: [
                                { text: "30 Years" },
                                { text: "45 Years" },
                                { text: "60 Years" },
                                { text: "75 Years" },
                            ]
                        },
                        correctOpt: "45 Years"
                    }
                ]
            }
        }
    ]

    await prisma.mockTest.deleteMany({})
    for (const test of tests) {
        await prisma.mockTest.create({ data: test })
    }

    console.log('Seeding finished.')
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
