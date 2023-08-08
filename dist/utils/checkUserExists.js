"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { User } = require("../../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const checkUserExists = (col, val) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const whereCondition = {
            [col]: { [Op.eq]: val },
        };
        const user = yield User.findOne({
            where: whereCondition,
        }).catch((err) => {
            console.log("Error in checkUserExists func");
            throw "Error in checkUserExists func";
        });
        return !user ? { success: false, user: null } : { success: true, user: user };
    }
    catch (err) {
        return { success: false, user: null };
    }
});
exports.default = checkUserExists;
