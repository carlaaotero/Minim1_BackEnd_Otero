import { activityDB } from '../models/activity';

export const getEntries = {
    // Obtenir todes les activitats
    getAll: async()=>{
        return await activityDB.find();
    },

    //Buscar una activitat per l'ID
    findById: async(id:string)=>{
        return await activityDB.findById(id);
    },

    // Crear una nova activitat 
    create: async(entry:object)=>{
        return await activityDB.create(entry);
    },

    // Actualitzar una activitat per l'ID
    update: async(id:string,body:object)=>{
        console.log(body);
        return await activityDB.findByIdAndUpdate(id,body,{$new:true});
    },

    // Eliminar una activitat per l'ID
    delete: async(id:string)=>{
        return await activityDB.findByIdAndDelete(id);
    },

    // Buscar activitats per etiqueta
    findByTag: async(tag: string) => {
        return await activityDB.find({ tags: { $in: [tag] } });
    },
    

    // Apuntar un usuari a una activitat
    addParticipant: async (activityId: string, userId: string) => {
        return await activityDB.findByIdAndUpdate(
            activityId,
            { $addToSet: { participants: userId } }, // Afegeix l'usuari si no hi és
            { new: true }
        );
    },

    // Desapuntar un usuari d'una activitat
    removeParticipant: async (activityId: string, userId: string) => {
        return await activityDB.findByIdAndUpdate(
            activityId,
            { $pull: { participants: userId } }, // Elimina l'usuari si hi és
            { new: true }
        );
    }



}