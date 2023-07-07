import {PrismaClient} from "@prisma/client";
import {randomInt} from "crypto";

async function main() {
    const prisma = new PrismaClient();

    await prisma.$connect();

    await prisma.user.deleteMany();

    const promises: Promise<void>[] = []

    for (let i = 1; i <= 100; i++){
        promises.push(runThread(prisma, i))
    }

    await Promise.all(promises);
    await prisma.$disconnect();
}

async function runThread(prisma: PrismaClient, index: number) {

    while (true) {
        const data = { id : randomInt(250000) };
        await prisma.user.upsert({
            where: { id: data.id },
            create: data,
            update: data,
        });
    }
}

main().catch(err => {
    console.error('Something went wrong :(', err);
    process.exit(1);
});