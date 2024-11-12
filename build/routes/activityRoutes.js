"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activityController_1 = require("../controllers/activityController");
const activityRouter = express_1.default.Router();
// Ruta per obtenir totes les activitats
activityRouter.get("/", activityController_1.getActivities);
// Ruta per crear una activitat nova
activityRouter.post("/", activityController_1.createActivity);
// Ruta per obtenir activitats per etiqueta
activityRouter.get("/tag/:tag", activityController_1.getActivitiesByTag);
// Ruta per obtenir una activitat per id
activityRouter.put("/:id", activityController_1.updateActivity);
// Ruta per eliminar una activitat per id
activityRouter.delete("/:id", activityController_1.deleteActivity);
// Ruta per apuntar un usuari a una activitat
activityRouter.put("/:activityId/participant/:userId", activityController_1.addParticipant);
// Ruta per desapuntar un usuari d'una activitat
activityRouter.delete("/:activityId/participant/:userId", activityController_1.removeParticipant);
exports.default = activityRouter;
