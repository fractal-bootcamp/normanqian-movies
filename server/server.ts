import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
  /* 
  const updateMovie = await prisma.movie.update({
    where: { id: 3 },
    data: { title: "fatestay", details: "sword of promised victory" },
  });


  const getUsers = await prisma.user.findMany();
  const getMovies = await prisma.movie.findMany();
  console.log(getUsers, getMovies);
  */
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

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("pinged"));

app.get("/movies", (req, res) => {
  prisma.movie.findMany().then((response) => res.send(response));
});

app.get("/users", (req, res) => {
  prisma.user.findMany().then((response) => res.send(response));
});

app.get("/search", (req, res) => {
  res.send();
});

app.get("/search/:query", (req, res) => {
  prisma.movie
    .findMany({
      where: {
        title: {
          search: `${req.params.query}`,
        },
      },
    })
    .then((response) => res.send(response));
});

/*
app.get("/movies/:id", (req, res) => {
    req.params.id
    prisma.movie
    
      .findMany()
      .then((response) => res.send(response));
  });

  
app.get("/users/:id", (req, res) => {
  req.params.id
  prisma.user
    .findMany()
    .then((response) => res.send(response));
});
*/

app.post("/favorite", (req, res) => res.send("pinged"));

const PORT = 4000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}
export default app;
