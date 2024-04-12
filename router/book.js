import { Router } from "express";
import { add,getAll,getOne,update,deletee } from "../controller/book.controller.js";

const router = Router();

router.post('/add', add);
router.get('/getall', getAll);
router.get('/getone/:id', getOne);
router.put('/update/:id', update);
router.delete('/delete/:id', deletee);

export default router;