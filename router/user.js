import { Router } from "express";
import { signUp, signIn, getUser,deleteUser } from "../controller/user.controller.js";
import { verifyUser } from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.post("/signup",upload.single('profilePic'), signUp);
router.post("/signin", signIn);
router.get("/profile", verifyUser, getUser);
router.delete('/delete' , verifyUser,deleteUser)

export default router;
