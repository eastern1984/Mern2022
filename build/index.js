"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var mongoose_1 = __importDefault(require("mongoose"));
var MONGODB_URI = process.env.MONGO_DB_CONNECTION || "";
var PORT = process.env.SERVER_PORT;
mongoose_1.default.connect(MONGODB_URI).then(function (result) {
    app_1.app.listen(PORT, function () {
        console.log('Listening on port ' + process.env.SERVER_PORT);
    });
}).catch(function (err) {
    console.log('Mongo connect error', err);
});
