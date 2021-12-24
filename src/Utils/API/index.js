const api = require("./http");

//Users

const login = async (email, password) => {
    if(email !== "" && password !== ""){
        return await api.login(email, password);
    }else throw new Error("Identifiant(s) manquant(s)");
}

const getUsers = async () => {
    return await api.getUsers();
}

const getUser = async (userid) => {
    if(userid !== undefined)
        return await api.getUser(userid);
    else throw new Error("Identifiant du user manquant");
}

const postUser = async (user) => {
    if(user !== undefined)
        return await api.addUser(user);
    else throw new Error("User manquant à la requête");
}

const deleteUser = async (userid) => {
    if(userid !== undefined)
        return await api.deleteUser(userid);
    else throw new Error("L'identifiant est obligatoire");
}

const updateUser = async (userId, modifiedUser) => {
    return await api.updateUser(userId, modifiedUser);
}

const grantUser = async (userid, grantInfo) => {
    return await api.grantUser(userid, grantInfo);
}

// Game Categories

const getGameCategories = async () => {
    return await api.getGameCategories();
}

const getGameCategory = async (categoryId) => {
    return await api.getGameCategory(categoryId);
}

const postGameCategory = async (addedGameCategory) => {
    return await  api.addGameCategory(addedGameCategory);
}

const deleteGameCategory = async (gameCategoryId) => {
    return await api.deleteGameCategory(gameCategoryId);
}

const updateGameCategory = async (gameCategoryId,updatedGameCategory) => {
    return await api.updateGameCategory(gameCategoryId,updatedGameCategory);
}

// Inscriptions

const getInscriptions = async () => {
    return await api.getInscriptions();
}

const getInscription = async (inscriptionId) => {
    return await api.getInscription(inscriptionId);
}

const postInscription = async (addedInscription) => {
    return await api.addInscription(addedInscription);
}

const deleteInscription = async (inscriptionId) => {
    return await api.deleteInscription(inscriptionId)
}

const updateInscription = async (inscriptionId, addedInscription) => {
    return await api.updateInscription(inscriptionId, addedInscription);
}

// Events

const getEvents = async () => {
    return await api.getEvents();
}

const getPendingEvents = async () => {
    return await api.getPendingEvents();
}

const getEvent = async (eventId) => {
    return await api.getEvent(eventId);
}

const addEvent  = async (addedEvent) => {
    return await api.addEvent(addedEvent);
}

const updateEvent = async (eventId, modifiedEvent) => {
    return await api.updateEvent(eventId, modifiedEvent);
}

const verifyEvent = async (eventid, verification) => {
    return await api.verifyEvent(eventid, verification);
}

const deleteEvent = async (eventId) =>  {
    return await api.deleteEvent(eventId);

}

export {
    login,
    getUsers,
    getUser,
    deleteUser,
    grantUser,
    postUser,
    updateUser,
    getGameCategories,
    getGameCategory,
    deleteGameCategory,
    postGameCategory,
    updateGameCategory,
    getInscriptions,
    getInscription,
    postInscription,
    deleteInscription,
    updateInscription,
    getEvents,
    getPendingEvents,
    getEvent,
    addEvent,
    updateEvent,
    verifyEvent,
    deleteEvent

}