"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activityDB = exports.activitySchema = void 0;
const mongoose_1 = require("mongoose");
exports.activitySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: ['Talk', 'Protest', 'Concert'] },
    participants: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'user' }], //Ref a la col·lecció d'usuaris
    tags: [{ type: String }] // Array de cadenes per a les etiquetes
});
exports.activityDB = (0, mongoose_1.model)('Activity', exports.activitySchema);
