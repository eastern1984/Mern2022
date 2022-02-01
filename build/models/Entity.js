"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    methods: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'Equipment', required: true }
    ],
});
exports.default = mongoose_1.model('Entity', schema);
