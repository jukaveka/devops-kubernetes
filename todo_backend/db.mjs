import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection created successfully.")
    await sequelize.sync({ alter: true })
    console.log("Database tables and models synced successfully.")
  } catch (error) {
    console.log("There was an issue with creating connection to database:", error)
  }
}

export const testDatabaseConnection = async () => {
  try {
    await sequelize.authenticate()
    return { ready: true }
  } catch (error) {
    console.log("Database connection is not ready:", error)
    return { ready: false, error: { information: error, name: error.name } }
  }
}

export default sequelize
