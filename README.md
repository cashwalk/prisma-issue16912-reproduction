# Description

for reproduction of this problem 
https://github.com/prisma/prisma/issues/16912#issuecomment-1622605478

executed the upsert operation in parallel

script(index.ts)



```typescript
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
```


Please check the memory usage of the RSS below.


## Version 4.8.1

<img width="839" alt="스크린샷 2023-07-07 17 40 33" src="https://github.com/cashwalk/prisma-issue16912-reproduction/assets/138547449/8bbf2b30-c74b-4747-8667-8031eefb4267">




## Version 4.9.0

<img width="860" alt="스크린샷 2023-07-07 17 40 43" src="https://github.com/cashwalk/prisma-issue16912-reproduction/assets/138547449/399d4de4-fb9b-48a6-b177-5e46ce371ddb">


# Clone

```
git clone https://github.com/ssungjeee/nudge-prisma.git
```

# Install
```
npm install
```
# Edit .env file

```
DATABASE_URL="postgresql://<user>:<password>@localhost:5432/<DB>?schema=public"
```

# Generate profile file

```
clinic doctor -- node index
```


# Run
```
npm run main
```



# Report file

.clinic/4.8.1.html

.clinic/4.9.0.html
