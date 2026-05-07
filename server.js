// Import dependencies
import express from "express";
import connectDatabase from "./config/connectDatabase.js";
import env from "./config/validateEnv.js";
import authenticateUser from "./middleware/authenticateUser.js";
import userRouter from "./routes/userRouter.js";

// Connect database
connectDatabase();

// Create express app
const app = express();

// Setup middleware
app.use(express.json());
app.use(authenticateUser);

// Define routes
app.use("/api/users/", userRouter);

// Start server
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
