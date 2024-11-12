import { model, Schema, Types } from "mongoose";


export interface activityInterface{
    name: string,
    date: Date,
    type: string,
    participants?: Types.ObjectId[],
    tags?: string[]
}

export type newActivityInfo = Omit<activityInterface,'id'>

export const activitySchema = new Schema<activityInterface>({
    name: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true, enum: ['Talk', 'Protest', 'Concert'] },
    participants: [{ type: Schema.Types.ObjectId, ref: 'user'}], //Ref a la col·lecció d'usuaris
    tags: [{ type: String }] // Array de cadenes per a les etiquetes
})

export const activityDB = model<activityInterface>('Activity', activitySchema)