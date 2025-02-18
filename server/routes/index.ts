// server/routes/index.ts
import { Application } from "express";
import conversationsRouter from "./conversations";

export async function registerRoutes(app: Application) {
    // Mount the conversations routes under the /api path
    app.use("/api/conversations", conversationsRouter);
    return app;
}
