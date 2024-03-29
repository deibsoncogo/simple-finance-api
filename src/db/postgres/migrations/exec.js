import "dotenv/config.js"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { pool } from "../helper.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const execMigrations = async () => {
  const client = await pool.connect()

  try {
    const filePath = path.join(__dirname, "01-init.sql")
    const script = fs.readFileSync(filePath, "utf-8")

    await client.query(script)

    console.log("Migrations executed successfully")
  } catch (error) {
    console.error("Error executed migrations =>", error)
  } finally {
    await client.release()
  }
}

execMigrations()
