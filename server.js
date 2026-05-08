// Import dependencies
import express from "express";
import connectDatabase from "./config/connectDatabase.js";
import env from "./config/validateEnv.js";
import authenticateUser from "./middleware/authenticateUser.js";
import userRouter from "./routes/userRouter.js";
import universityRouter from "./routes/universityRouter.js";

// Connect database
connectDatabase();

// Create express app
const app = express();

// Setup middleware
app.use(express.json());
app.use(authenticateUser);

// Define routes
app.use("/api/users/", userRouter);
app.use("/api/universities/", universityRouter);

// Start server
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
