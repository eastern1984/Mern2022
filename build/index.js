"use strict";
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
var MONGODB_URI = 'mongodb://localhost:27017/omnitec';
var PORT = 3000;
var app = (0, express_1.default)();
var MongoDBStore = (0, connect_mongodb_session_1.default)(express_session_2.default);
var store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
app.use((0, express_session_1.default)({ secret: 'my secret string', resave: false, saveUninitialized: false, store: store })).use((0, connect_flash_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use('/api', loginRoutes_1.router);
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
    console.log('321Mongo connect error', err);
});
