"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const router = (0, express_1.Router)();
router.get("/get/:uuid", user_1.default.get);
router.post("/create", user_1.default.create);
router.post("/update", user_1.default.update);
router.post("/delete", user_1.default.deleteFunc);
exports.default = router;
