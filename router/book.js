import { Router } from "express";
import { add,bookList,getUserAllBook,getUserOneBook,update,remove } from "../controller/book.controller.js";
import { verifyUser } from "../middleware/auth.js";

const router = Router();

router.get('/list', bookList);

router.use(verifyUser);
router.post('/add', add);
router.get('/getall', getUserAllBook);
router.get('/getone/:id', getUserOneBook);
router.put('/update/:id', update);
router.delete('/delete/:id', remove);

export default router;