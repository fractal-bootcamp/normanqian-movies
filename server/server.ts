import express from "express";
import cors from "cors";
import { Movie, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ... you will write your Prisma Client queries here
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

app.get("/movies/:id", (req, res) => {
  prisma.movie
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    .then((response) => res.send(response));
});

app.get("/users/:id", (req, res) => {
  prisma.user
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
    })
    .then((response) => res.send(response));
});

app.get("/users/:id/favorites", (req, res) => {
  prisma.user
    .findUnique({
      where: {
        id: Number(req.params.id),
      },
      include: {
        favorites: true,
      },
    })
    .then((response) => res.send(response));
});

//this needs an update
//movies/:id has both a get and post req
app.post("/movies/:movieId/:userId", async (req, res) => {
  const id = req.params.userId;
  const movie = await prisma.movie.findUnique({
    where: {
      id: Number(req.params.movieId),
    },
    include: {
      favoritedBy: true,
    },
  });

  if (movie) {
    if (
      movie.favoritedBy.findIndex((currentElement, index) => {
        if (currentElement.id === Number(id)) {
          return true;
        }
      }) == -1
    ) {
      prisma.movie
        .update({
          where: {
            id: Number(req.params.movieId),
          },
          data: {
            favoritedBy: {
              connect: { id: Number(req.params.userId) },
            },
          },
        })
        .then((response) => res.send(response));
      // there's no favorite. create a favorite
    } else {
      prisma.movie
        .update({
          where: {
            id: Number(req.params.movieId),
          },
          data: {
            favoritedBy: {
              disconnect: { id: Number(req.params.userId) },
            },
          },
        })
        .then((response) => res.send(response));
      // favorite found. remove favorite
    }
  }
});

const PORT = 4000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}
export default app;

//includes

/*
app.post("/movies/:movieId/:userId", (req, res) => {
  prisma.movie
    .update({
      where: {
        id: Number(req.params.movieId),
      },
      data: {
        favoritedBy: {
          connect: { id: Number(req.params.userId) },
        },
      },
    })
    .then((response) => res.send(response));
});
*/
