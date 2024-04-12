import { Router } from "express";
import userrouter from "./user.js";
import bookrouter from "./book.js";
const router = Router();

router.use("/user", userrouter);
router.use("/book", bookrouter);

export default router;
