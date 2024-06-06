import express from "express";
import cors from "cors";
import notFound from "./app/middlewares/notFound";
import globalErrorhandler from "./app/middlewares/globalErrorhandler";
import router from "./app/routes";

const app = express();

// using middleware
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res
    .status(200)
    .send(
      '<div style="height:80vh; width:100vw; display:flex; justify-content:center;align-items:center;font-size:4rem;font-style: oblique;font-weight: bold;font-family:system-ui;color:purple;">Domino Server is Running...</div>',
    );
});

// Application Routes
app.use("/api/v1", router);

// route not found error
app.use("*", notFound);

// global error handler
app.use(globalErrorhandler);

export default app;
