import mongoose from "mongoose";

export const ConnectDB = async () => {
  try {
    const connectionString = process.env.MONGODB_URL;
    if (!connectionString) {
      throw new Error("MONGODB_URL environment variable is not defined");
    }

    const connection = await mongoose.connect(connectionString, {
      dbName: "work_Manager",
    });

    console.log("user Has created");
    console.log(
      "=============================================================="
    );
    console.log("Connection successful to database");
  } catch (error) {
    console.error("Database connection error:", error.message);
    throw error;
  }
};
