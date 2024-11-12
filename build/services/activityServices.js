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
exports.getEntries = void 0;
const activity_1 = require("../models/activity");
exports.getEntries = {
    // Obtenir todes les activitats
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.find();
    }),
    //Buscar una activitat per l'ID
    findById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.findById(id);
    }),
    // Crear una nova activitat 
    create: (entry) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.create(entry);
    }),
    // Actualitzar una activitat per l'ID
    update: (id, body) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(body);
        return yield activity_1.activityDB.findByIdAndUpdate(id, body, { $new: true });
    }),
    // Eliminar una activitat per l'ID
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.findByIdAndDelete(id);
    }),
    // Buscar activitats per etiqueta
    findByTag: (tag) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.find({ tags: { $in: [tag] } });
    }),
    // Apuntar un usuari a una activitat
    addParticipant: (activityId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.findByIdAndUpdate(activityId, { $addToSet: { participants: userId } }, // Afegeix l'usuari si no hi és
        { new: true });
    }),
    // Desapuntar un usuari d'una activitat
    removeParticipant: (activityId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield activity_1.activityDB.findByIdAndUpdate(activityId, { $pull: { participants: userId } }, // Elimina l'usuari si hi és
        { new: true });
    })
};
