"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const option_1 = __importDefault(require("../controllers/option"));
const router = (0, express_1.Router)();
router.get("/get-all/:uuid/:decisionId", option_1.default.getAll);
router.post("/create", option_1.default.create);
// router.post("/update", option.update);
exports.default = router;
