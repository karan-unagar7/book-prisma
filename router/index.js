import { Router } from "express";
import userrouter from "./user.js";
import bookrouter from "./book.js";
import { verifyUser } from "../middleware/auth.js";
const router = Router();

router.use("/user", userrouter);
router.use("/book", verifyUser, bookrouter);

export default router;
