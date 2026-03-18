import dotenv from "dotenv"
dotenv.config()

import app from "./app.js";
import pool from "./config/db.js";
import migrate from "./config/migrate.js";
import "./cron/tripReminder.cron.js";


const PORT=process.env.PORT

// connect to DB, run migrations, then start server
pool.connect()
    .then(async () => {
        console.log("✅ PostgreSQL connected");
        await migrate();
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT}`);
        });
    })
    .catch((err) => console.error("❌ DB connection error", err));