import {Router} from "express";
import decision from "../controllers/decision";

const router = Router();

router.get("/get-all/:uuid", decision.getAll);
router.post("/create", decision.create);
// router.post("/update", decision.update);

export default router;
