"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var loginRoutes_1 = require("./routes/loginRoutes");
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var mongoose_1 = __importDefault(require("mongoose"));
var connect_mongodb_session_1 = __importDefault(require("connect-mongodb-session"));
var express_session_1 = __importDefault(require("express-session"));
var MONGODB_URI = 'mongodb://localhost:27017/omnitec';
var PORT = 3000;
var app = express_1.default();
var MongoDBStore = connect_mongodb_session_1.default(express_session_1.default);
var store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});
/*app.use(
  ExpressSession({ secret: 'my secret string', resave: false, saveUninitialized: false, store: store })
).use(flash());*/
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({ keys: ['laskdjf'] }));
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client', 'build')));
app.get('*', function (req, res) {
    res.sendFile(path_1.default.join(__dirname, '..', 'client', 'build', 'index.html'));
});
app.use(loginRoutes_1.router);
mongoose_1.default.connect(MONGODB_URI).then(function (result) {
    app.listen(PORT, function () {
        console.log('Listening on port 3000 ');
    });
}).catch(function (err) {
    console.log('321Mongo connect error', err);
});
