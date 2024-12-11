import cron from "node-cron";
import db from "./index.js"; // Assuming your PostgreSQL connection setup is in db.js

const clearTable = async () => {
  try {
    await db.query("TRUNCATE TABLE Messages;");
    console.log("Messages cleared successfully.");
  } catch (error) {
    console.error("Error clearing Messages:", error.message);
  }
};

// Schedule the task to run every 24 hours (midnight)
export const startClearTableTask = () => {
  //   cron.schedule("0 0 * * *", async () => {
  cron.schedule("* * * * *", async () => {
    console.log("Scheduled task running to clear Messages...");
    await clearTable();
  });
  console.log("Scheduled clearing task set up.");
};
