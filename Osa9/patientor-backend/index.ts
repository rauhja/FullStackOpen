import express from "express";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
};

const app = express();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors(corsOptions));
app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
