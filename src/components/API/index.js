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

const getCategories = async () => {
    return await api.getCategories();
}

const getCategory = async (categoryId) => {
    return await api.getCategory(categoryId);
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

const getInscriptions = async () => {
    return await api.getInscriptions();
}

const getInscription = async () => {
    return await api.getInscription();
}
const deleteInscription = async (inscriptionId) => {
    return await api.deleteInscription(inscriptionId)
}

const getEvents = async () => {
    return await api.getEvents();
}

const getEvent = async (eventId) => {
    return await api.getEvent(eventId);
}

export {
    login,
    getUsers,
    getUser,
    deleteUser,
    postUser,
    getCategories,
    getCategory,
    deleteGameCategory,
    postGameCategory,
    updateGameCategory,
    getInscriptions,
    getInscription,
    deleteInscription,
    getEvents,
    getEvent
}