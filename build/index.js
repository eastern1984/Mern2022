"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var mongoose_1 = __importDefault(require("mongoose"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
var express_session_1 = __importDefault(require("express-session"));
var connect_flash_1 = __importDefault(require("connect-flash"));
var express_session_2 = __importDefault(require("express-session"));
var nats_1 = require("./utils/nats");
var dotenv = __importStar(require("dotenv"));
dotenv.config({ path: './.env' });
var MONGODB_URI = process.env.MONGO_DB_CONNECTION || "";
var PORT = process.env.SERVER_PORT;
var app = (0, express_1.default)();
var MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_2.default);
var store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.use((0, express_session_1.default)({ secret: process.env.SECRET_SESSION_STRING || "", resave: false, saveUninitialized: false, store: store })).use((0, connect_flash_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(process.env.API_URL || "", loginRoutes_1.router);
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'build')));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'build', 'index.html'));
});
(0, nats_1.natsConnect)();
mongoose_1.default.connect(MONGODB_URI).then(function (result) {
    app.listen(PORT, function () {
        console.log('Listening on port 3000 ');
    });
}).catch(function (err) {
    console.log('Mongo connect error', err);
});
