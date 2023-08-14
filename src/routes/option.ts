import {Router} from "express";
import option from "../controllers/option";

const router = Router();

router.post("/get-all", option.getAll);
router.post("/create", option.create);
router.post("/update", option.update);

export default router;
