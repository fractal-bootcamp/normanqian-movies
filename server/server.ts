import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("pinged"));

const PORT = 4000;

app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
