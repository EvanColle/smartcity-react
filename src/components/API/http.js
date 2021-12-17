import axios from "axios";


const URL = "http://localhost:3001";

let header;

//Users

const login = async (email, password) => {

    const response = await axios.post(URL + "/user/login/", {
        email, password
    }).catch(error => {
        if (error.response.status === 500) {
            throw new Error("Erreur de connexion");
        } else if (error.response.status === 400) {
            console.log("Ici l'erreur")
            throw new Error("Identifiants manquants");
        } else if (error.response.status === 401) {
            throw new Error("Identifiants incorrects");
        } else if (error.response.status === 404) {
            throw new Error("Utilisateur inconnu");
        }
    });
    header = {
        'Authorization': 'Bearer ' + response.data
    }
    const jwt = Buffer.from(response.data.split(".")[1], "base64").toString("utf-8");
    //console.log(response.data);
    return JSON.parse(jwt)
}

const getUsers = async () => {
    const response = await axios.get( URL + "/user/" , {headers : header} ).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Les users n'ont pas été trouvés");
        });
    return response.data;
}

const getUser = async (userid) => {
    const response = await axios.get(URL + `/user/${userid}`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Le user n'a pas été trouvé");
    });
    return response.data;
}

const addUser = async (user) => {
    const response = await axios.post(`${URL}/user`, {
        lastname: user.name,
        firstname: user.firstname,
        birthdate: user.birthdate,
        email: user.email,
        password: user.password,
        photopath: user.photopath
    }, {headers: header}).catch((error) => {
        if (error.response.status === 500)
            throw new Error("La création à échouer");
    });
    return response.data;
}

const deleteUser = async (userId) => {
    const response = await axios.delete(`${URL}/user/${userId}`, {
        headers : header
    }).catch((error) => {
        if (error.response.status === 401)
            throw new Error("Votre session est échue, veuillez vous reconnecter.");
        else if (error.response.status === 400)
            throw new Error("Mauvaise requête. Réessayez.");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("Le User n'a pas été trouvé");
        else if (error.response.status === 500)
            throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
    });
    return response.data;
}

//GameCategories

const getCategories = async () => {
    const response = await axios.get(URL + "/gameCategory/", {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Les catégories n'ont pas été trouvées");
    });
    return response.data;
}

const getCategory = async (categoryId) => {
    const response = await axios.get(`${URL}/gameCategory/${categoryId}`, {headers : header}).catch((error) => {
        if(response.status === 404)
            throw new Error("Catégorie inexistante");
    });
    return response.data;
}

const addGameCategory = async (gameCategory) => {
    const response = await axios.post(`${URL}/gameCategory/`, {
        label : gameCategory.label,
        description: gameCategory.description
    }, {headers: header}).catch((error) => {
        if (error.response.status === 500){
            throw new Error("La création a échoué");
        }
    });
    return response.data;
}

const deleteGameCategory = async (gameCategoryId) => {
    const response = await axios.delete(`${URL}/gameCategory/${gameCategoryId}`, {
        headers : header
    }).catch((error) => {
        if (error.response.status === 401)
            throw new Error("Votre session est échue, veuillez vous reconnecter.");
        else if (error.response.status === 400)
            throw new Error("Mauvaise requête. Réessayez.");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("La catégorie n'a pas été trouvée");
        else if (error.response.status === 500)
            throw new Error("Erreur lors du traitement de votre demande. Veuillez vous assurer que les informations entrées sont correctes.");
    });
    return response.data;
}

const updateGameCategory = async (gameCategoryId,updatedGameCategory) => {
    const response = await axios.patch(`${URL}/gameCategory/${gameCategoryId}`, {
        label : updatedGameCategory.label,
        description: updatedGameCategory.description
    }, {headers: header}).catch((error) => {
        if (error.response.status === 500){
            throw new Error("La modification a échoué");
        }
        else if(error.response.status === 401){
            throw new Error("Vous devez vous identifier");
        }
    });
    return response.data;
}

// Inscriptions

const getInscriptions = async () => {
    const response = await axios.get(`${URL}/inscription/`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Les inscriptions n'ont pas été trouvées");
    });
    return response.data;
}

const getInscription = async (inscriptionId) => {
    const response = await axios.get(`${URL}/inscription/${inscriptionId}`, {headers : header}).catch((error) => {
       if(error.response.status === 404)
           throw new Error("L'inscription n'a pas été trouvée");
    });
    return response.data;
}

const deleteInscription = async (inscriptionId) => {
    const response = await axios.get(`${URL}/inscription/${inscriptionId}`, {headers : header}).catch((error) => {
        if(error.response.status === 404)
            throw new Error("L'inscription n'a pas été trouvée");
    });
    return response.data;
}


//Events
const getEvents = async () => {
    const response = await axios.get(`${URL}/event/`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Les events n'ont pas été trouvées");
    });
    return response.data;
}

const getEvent = async (eventId) => {
    const response = await axios.get(`${URL}/event/${eventId}`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("L'event n'a pas été trouvées");
    });
    return response.data;
}



export {
    login,
    getUsers,
    getCategories,
    getCategory,
    deleteGameCategory,
    updateGameCategory,
    getUser,
    addUser,
    deleteUser,
    getInscriptions,
    getInscription,
    deleteInscription,
    getEvents,
    getEvent,
    addGameCategory
}