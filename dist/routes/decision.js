"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const decision_1 = __importDefault(require("../controllers/decision"));
const router = (0, express_1.Router)();
router.get("/get-all/:uuid", decision_1.default.getAll);
router.post("/create", decision_1.default.create);
// router.post("/update", decision.update);
exports.default = router;
