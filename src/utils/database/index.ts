import mongoose from "mongoose";
import chalk from "chalk";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log(chalk.magenta("database connected"));
  } catch (error) {
    console.log(chalk.red(error));
  }
};

export default dbConnection;
