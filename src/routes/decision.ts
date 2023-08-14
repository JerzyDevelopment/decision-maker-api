import {Router} from "express";
import decision from "../controllers/decision";

const router = Router();

router.post("/get-all", decision.getAll);
router.post("/create", decision.create);
router.post("/update", decision.update);
router.post("/delete", decision.deleteFunc);

export default router;
