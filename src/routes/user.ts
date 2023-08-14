import {Router} from "express";
import user from "../controllers/user";

const router = Router();

router.get("/get/:uuid", user.get);
router.post("/create", user.create);
router.post("/update", user.update);
router.post("/delete", user.deleteFunc);

export default router;
