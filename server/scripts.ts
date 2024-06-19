import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here

  /* 
  const updateMovie = await prisma.movie.update({
    where: { id: 3 },
    data: { title: "fatestay", details: "sword of promised victory" },
  });
  */

  const getUsers = await prisma.user.findMany();
  const getMovies = await prisma.movie.findMany();
  console.log(getUsers, getMovies);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
  const createUser = await prisma.user.create({
    data: {
      name: "David",
      favorites: {
        create: [{ title: "Toy Story", details: "Buzz Lightyear and Woody" }],
      },
    },
  });

  const createMovie = await prisma.movie.create({
    data: { title: "Toy Story", details: "Buzz Lightyear and Woody" },
  });

*/
