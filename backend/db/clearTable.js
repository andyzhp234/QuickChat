import db from "./index.js";

const clearTable = async () => {
  try {
    await db.query('TRUNCATE TABLE "Messages";');
    // await db.query('TRUNCATE TABLE "ConversationParticipants";');
    // await db.query('TRUNCATE TABLE "Conversations";');
    console.log("Messages cleared successfully.");
  } catch (error) {
    console.error("Error clearing Messages:", error.message);
  }
};

const startClearTableTask = () => {
  // Run the task immediately on server start
  clearTable();

  // Schedule the task to run every 24 hours (86,400,000 milliseconds)
  const interval = 24 * 60 * 60 * 1000; // 24 hours
  setInterval(clearTable, interval);

  console.log("Scheduler started to clear chat table every 24 hours.");
};

export default startClearTableTask;
