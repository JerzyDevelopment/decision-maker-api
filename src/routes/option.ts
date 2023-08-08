import {Router} from "express";
import option from "../controllers/option";

const router = Router();

router.get("/get-all/:uuid/:decisionId", option.getAll);
router.post("/create", option.create);
// router.post("/update", option.update);

export default router;
