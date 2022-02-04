"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    entities: [{ type: mongoose_1.Types.ObjectId, ref: 'Entity' }],
});
exports.default = (0, mongoose_1.model)('User', schema);
