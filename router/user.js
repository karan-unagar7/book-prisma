import { Router } from "express";
import { signUp, signIn, profile,remove } from "../controller/user.controller.js";
import { verifyUser } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post("/signup",upload.single('profilePic'), signUp);
router.post("/signin", signIn);
router.get("/profile", verifyUser, profile);
router.delete('/delete' , verifyUser,remove)

export default router;
