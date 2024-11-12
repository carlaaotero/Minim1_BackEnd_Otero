import { Request, Response } from "express";
import * as activityServices from "../services/activityServices";
import { activityInterface } from "../models/activity";


export async function getActivities(_req: Request, res: Response): Promise<Response> {
    try {
        console.log("Get Activities");
        const activities = await activityServices.getEntries.getAll();
        console.log("activity", activities);
        return res.json(activities);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get activities' });
    }
}

export async function createActivity(req: Request, res: Response): Promise<Response> {
    try {
        const { name, date, type, participants, tags } = req.body as activityInterface;

        const newActivity: activityInterface = {
            name,
            date,
            type,
            participants: participants || [],
            tags: tags || [],
        };

        const activity = await activityServices.getEntries.create(newActivity);

        return res.json({
            message: "Activity created",
            activity
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create an activity' }); // Devuelve un mensaje de error al frontend
    }
}

export async function updateActivity(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Get activity');
        const id = req.params.id;
        const { name, date, type, participants, tags } = req.body as activityInterface;
        const updatedActivity: Partial<activityInterface> = { name, date, type, participants, tags };
        const activity = await activityServices.getEntries.update(id, updatedActivity);

        if (!activity) {
            return res.status(404).json({ error: 'Activity with id ${id} not found' });
        }
        return res.json({
            message: "Activity updated",
            activity
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to update activity' });
    }
}

export async function deleteActivity(req: Request, res: Response): Promise<Response> {
    try {
        console.log('Delete activity');
        const id = req.params.id;
        const deletedActivity = await activityServices.getEntries.delete(id);

        if (!deletedActivity) {
            return res.status(404).json({ error: 'Activity with id ${id} not found' });
        }
        return res.json({ message: "Activity deleted", deleteActivity });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to get activity' });
    }
}

export async function getActivitiesByTag(req: Request, res: Response): Promise<Response> {
    try {
        const tag = req.params.tag;
        const activities = await activityServices.getEntries.findByTag(tag);

        return res.json(activities);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to find activities by tag' });
    }
}

export async function addParticipant(req: Request, res: Response): Promise<Response> {
    try {
        const activityId = req.params.activityId;
        const userId = req.params.userId;

        const updatedActivity = await activityServices.getEntries.addParticipant(activityId, userId);
        if (!updatedActivity) {
            return res.status(404).json({ error: `Activity with id ${activityId} not found` });
        }
        return res.json({ message: "User added to activity", updatedActivity });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to add participant' });
    }
}

export async function removeParticipant(req: Request, res: Response): Promise<Response> {
    try {
        const activityId = req.params.activityId;
        const userId = req.params.userId;

        const updatedActivity = await activityServices.getEntries.removeParticipant(activityId, userId);
        if (!updatedActivity) {
            return res.status(404).json({ error: `Activity with id ${activityId} not found` });
        }
        return res.json({ message: "User removed from activity", updatedActivity });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to remove participant' });
    }
}