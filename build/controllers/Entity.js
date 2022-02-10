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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postEntity = exports.postObjects = exports.postGetFilters = exports.getEntity = exports.getEntities = exports.METHOD_TYPES = void 0;
var Entity_1 = __importDefault(require("../models/Entity"));
var User_1 = __importDefault(require("../models/User"));
var nats_1 = require("../utils/nats");
var METHOD_TYPES;
(function (METHOD_TYPES) {
    METHOD_TYPES[METHOD_TYPES["GET"] = 0] = "GET";
    METHOD_TYPES[METHOD_TYPES["POST"] = 1] = "POST";
})(METHOD_TYPES = exports.METHOD_TYPES || (exports.METHOD_TYPES = {}));
var getEntities = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, entities;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.findById(req.session.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ success: 'Error', message: 'No user' })];
                }
                return [4 /*yield*/, Entity_1.default.find({ _id: { "$in": user.entities } })];
            case 2:
                entities = _a.sent();
                return [2 /*return*/, res.json({ success: 'OK', data: entities })];
        }
    });
}); };
exports.getEntities = getEntities;
var getEntity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, entity;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Entity_1.default.findById(id)];
            case 1:
                entity = _a.sent();
                return [2 /*return*/, res.json({ success: 'OK', data: entity })];
        }
    });
}); };
exports.getEntity = getEntity;
var postGetFilters = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var fields, natsResult, tmp;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fields = req.body;
                return [4 /*yield*/, (0, nats_1.getNatsData)('Get filter', fields)];
            case 1:
                natsResult = _a.sent();
                if (!Array.isArray(natsResult)) {
                    tmp = [natsResult];
                }
                else {
                    tmp = natsResult;
                }
                return [2 /*return*/, res.json({ success: 'OK', data: tmp })];
        }
    });
}); };
exports.postGetFilters = postGetFilters;
var postObjects = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var user, entity, postMethod, objects, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, User_1.default.findById(req.session.userId)];
            case 1:
                user = _a.sent();
                if (!user) {
                    return [2 /*return*/, res.json({ success: 'Error', message: 'No user' })];
                }
                return [4 /*yield*/, Entity_1.default.findById(req.body.id)];
            case 2:
                entity = _a.sent();
                if (!entity) {
                    return [2 /*return*/, res.json({ success: 'Error', message: 'No entity' })];
                }
                postMethod = entity.methods.find(function (v) { return v.type === METHOD_TYPES.POST; });
                if (!postMethod) {
                    return [2 /*return*/, res.json({ success: 'Error', message: 'No post method' })];
                }
                objects = req.body.objects;
                return [4 /*yield*/, (0, nats_1.getNatsData)(postMethod.subscriptionName, objects)];
            case 3:
                result = _a.sent();
                return [2 /*return*/, res.json({ success: 'OK', data: result })];
        }
    });
}); };
exports.postObjects = postObjects;
var postEntity = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, fields, entity, newFilterSchema, methods;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                fields = req.body.fields;
                return [4 /*yield*/, Entity_1.default.findById(id)];
            case 1:
                entity = _a.sent();
                newFilterSchema = {
                    type: METHOD_TYPES.GET,
                    filterSchema: fields,
                    active: true,
                    responseSchema: {},
                    subscriptionBody: {},
                    subscriptionName: 'get'
                };
                if (!entity) {
                    return [2 /*return*/, res.json({ success: 'Error' })];
                }
                methods = entity.methods;
                if (methods.filter(function (v) { return v.type === METHOD_TYPES.GET; }).length > 0) {
                    entity.methods = methods.map(function (v) {
                        if (v.type === METHOD_TYPES.GET) {
                            v.filterSchema = fields;
                        }
                        return v;
                    });
                }
                else {
                    entity.methods = entity.methods ? __spreadArray(__spreadArray([], entity.methods, true), [newFilterSchema], false) : [newFilterSchema];
                }
                return [4 /*yield*/, entity.save()];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ success: 'OK', entity: entity })];
        }
    });
}); };
exports.postEntity = postEntity;
