import { PrismaClient, Prisma } from "@prisma/client";
import { hash } from "bcryptjs";
import { config, DotenvConfigOutput, DotenvParseOutput } from "dotenv";

const configResult: DotenvConfigOutput = config();
const configParsed: DotenvParseOutput = configResult.parsed;

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    name: "Alice",
    email: "alice@prisma.io",
    password: "123456",
    posts: {
      create: [
        {
          title: "Join the Prisma Discord",
          content: "https://pris.ly/discord",
          published: true,
        },
      ],
    },
  },
  {
    name: "Mahmoud",
    email: "mahmoud@prisma.io",
    password: "123456",
    posts: {
      create: [
        {
          title: "Ask a question about Prisma on GitHub",
          content: "https://www.github.com/prisma/prisma/discussions",
          published: true,
        },
        {
          title: "Prisma on YouTube",
          content: "https://pris.ly/youtube",
        },
      ],
    },
  },
];
async function main() {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    u.password = await hash(u.password, Number(configParsed.SALT_ROUNDS));
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
