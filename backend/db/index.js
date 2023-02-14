import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

const db = new Sequelize(process.env.PGCONNURL, { logging: false });

const connectDB = async () => {
  try {
    await db.authenticate();
    console.log(`PostgreSQL Connected`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default db;
export { connectDB };
