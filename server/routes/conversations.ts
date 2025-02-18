// server/routes/conversations.ts
import { Router, Request, Response, NextFunction } from "express";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { conversations } from "../../shared/schema";

const router = Router();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const db = drizzle(pool);

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, sender, message, userId, agentId } = req.body;
        if (!title || !sender || !message || !userId || !agentId) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        console.log(title, sender, message, userId, agentId);

        const result = await db
            .insert(conversations)
            .values({ title, sender, message, userId, agentId })
            .returning();
        res.status(201).json(result);
    } catch (error: any) {
        console.error("Error creating conversation:", error);
        res.status(500).json({ error: "Failed to create conversation", details: error.message });
    }
});

export default router;
