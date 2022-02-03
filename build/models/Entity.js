"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var methodSchema = new mongoose_1.Schema({
    type: {
        type: Number,
    },
    active: {
        type: Boolean,
    },
    subscriptionName: {
        type: String,
    },
    filterSchema: {
        type: Object,
    },
    subscriptionBody: {
        type: Object,
    },
    responseSchema: {
        type: Object,
    },
});
var schema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    methods: [methodSchema],
});
exports.default = mongoose_1.model('Entity', schema);
