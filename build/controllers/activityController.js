"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.getActivities = getActivities;
exports.createActivity = createActivity;
exports.updateActivity = updateActivity;
exports.deleteActivity = deleteActivity;
exports.getActivitiesByTag = getActivitiesByTag;
exports.addParticipant = addParticipant;
exports.removeParticipant = removeParticipant;
const activityServices = __importStar(require("../services/activityServices"));
function getActivities(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Get Activities");
            const activities = yield activityServices.getEntries.getAll();
            console.log("activity", activities);
            return res.json(activities);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get activities' });
        }
    });
}
function createActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { name, date, type, participants, tags } = req.body;
            const newActivity = {
                name,
                date,
                type,
                participants: participants || [],
                tags: tags || [],
            };
            const activity = yield activityServices.getEntries.create(newActivity);
            return res.json({
                message: "Activity created",
                activity
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to create an activity' }); // Devuelve un mensaje de error al frontend
        }
    });
}
function updateActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Get activity');
            const id = req.params.id;
            const { name, date, type, participants, tags } = req.body;
            const updatedActivity = { name, date, type, participants, tags };
            const activity = yield activityServices.getEntries.update(id, updatedActivity);
            if (!activity) {
                return res.status(404).json({ error: 'Activity with id ${id} not found' });
            }
            return res.json({
                message: "Activity updated",
                activity
            });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to update activity' });
        }
    });
}
function deleteActivity(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('Delete activity');
            const id = req.params.id;
            const deletedActivity = yield activityServices.getEntries.delete(id);
            if (!deletedActivity) {
                return res.status(404).json({ error: 'Activity with id ${id} not found' });
            }
            return res.json({ message: "Activity deleted", deleteActivity });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to get activity' });
        }
    });
}
function getActivitiesByTag(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tag = req.params.tag;
            const activities = yield activityServices.getEntries.findByTag(tag);
            return res.json(activities);
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to find activities by tag' });
        }
    });
}
function addParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activityId = req.params.activityId;
            const userId = req.params.userId;
            const updatedActivity = yield activityServices.getEntries.addParticipant(activityId, userId);
            if (!updatedActivity) {
                return res.status(404).json({ error: `Activity with id ${activityId} not found` });
            }
            return res.json({ message: "User added to activity", updatedActivity });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to add participant' });
        }
    });
}
function removeParticipant(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const activityId = req.params.activityId;
            const userId = req.params.userId;
            const updatedActivity = yield activityServices.getEntries.removeParticipant(activityId, userId);
            if (!updatedActivity) {
                return res.status(404).json({ error: `Activity with id ${activityId} not found` });
            }
            return res.json({ message: "User removed from activity", updatedActivity });
        }
        catch (error) {
            return res.status(500).json({ error: 'Failed to remove participant' });
        }
    });
}
