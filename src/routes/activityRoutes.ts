import express from 'express';
import { getActivities, createActivity, updateActivity, deleteActivity, getActivitiesByTag, addParticipant, removeParticipant } from '../controllers/activityController';

const activityRouter = express.Router();

// Ruta per obtenir totes les activitats
activityRouter.get("/", getActivities);

// Ruta per crear una activitat nova
activityRouter.post("/", createActivity);

// Ruta per obtenir activitats per etiqueta
activityRouter.get("/tag/:tag", getActivitiesByTag);

// Ruta per obtenir una activitat per id
activityRouter.put("/:id", updateActivity);

// Ruta per eliminar una activitat per id
activityRouter.delete("/:id", deleteActivity);

// Ruta per apuntar un usuari a una activitat
activityRouter.put("/:activityId/participant/:userId", addParticipant);

// Ruta per desapuntar un usuari d'una activitat
activityRouter.delete("/:activityId/participant/:userId", removeParticipant);

export default activityRouter;
