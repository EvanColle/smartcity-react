import axios from "axios";

const URL = "http://localhost:3001";
let header;

//Users

const login = async (email, password) => {

    const response = await axios.post(URL + "/user/login/", {
        email, password
    }).catch(error => {
        if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        } else if (error.response.status === 400) {
            throw new Error("Identifiants manquants");
        } else if (error.response.status === 404) {
            throw new Error("Utilisateur inconnu");
        }
    });
    header = {
        'Authorization': 'Bearer ' + response.data
    }
    const jwt = Buffer.from(response.data.split(".")[1], "base64").toString("utf-8");
    return JSON.parse(jwt);
}

const getUsers = async () => {
    const response = await axios.get( URL + "/user/" , {headers : header} ).catch((error) => {
        if (error.response.status === 404) {
            throw new Error("Les utilisateurs n'ont pas été trouvés");
        } else if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        } else if (error.response.status === 401) {
            throw new Error("Authentification nécessaire");
        } else if (error.response.status === 400) {
            throw new Error("Erreur de syntaxe")
        }
    });
    return response.data;
}

const getUser = async (userid) => {
    const response = await axios.get(URL + `/user/${userid}`, {headers : header}).catch((error) => {
        if (error.response.status === 404) {
            throw new Error("L'utilisateur n'a pas été trouvé");
        } else if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        } else if (error.response.status === 401) {
            throw new Error("Authentification nécessaire");
        } else if (error.response.status === 400) {
            throw new Error("Erreur de syntaxe")
        }
    });
    return response.data;
}

const addUser = async (user) => {
    const response = await axios.post(`${URL}/user`, {
        lastname: user.lastname,
        firstname: user.firstname,
        birthdate: user.birthdate,
        isadmin : user.isadmin,
        email: user.email,
        password: user.password,
        photopath: user.photopath
    }, {headers: header}).catch((error) => {
        if (error.response.status === 400) {
            throw new Error("Erreur de syntaxe");
        } else if (error.response.status === 201) {
            throw new Error("Utilisateur créé");
        } else if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        }
    });
    return response.data;
}

const deleteUser = async (userId) => {
    const response = await axios.delete(`${URL}/user/${userId}`, {
        headers : header
    }).catch((error) => {
        if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("L'utilisateur n'a pas été trouvé");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
        else if(error.response.status === 204){
            throw new Error("Utilisateur supprimé");
        }
    });
    return response.data;
}

const updateUser = async (userId, modifiedUser) => {

    const response = await axios.patch(`${URL}/user/${userId}`,{
        lastname: modifiedUser.lastname,
        firstname: modifiedUser.firstname,
        birthdate: modifiedUser.birthdate,
        isadmin : modifiedUser.isadmin,
        email: modifiedUser.email,
        password: modifiedUser.password,
        photopath: modifiedUser.photopath

    },{headers : header}).catch((error) => {
        if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("L'utilisateur n'a pas été trouvé");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
        else if(error.response.status === 204){
            throw new Error("Utilisateur modifié");
        }
    });
    return response.data;
}

const grantUser = async (userid, grantInfo) => {

    const response = axios.patch(`${URL}/user/grant/${userid}`, {
        isAdmin : grantInfo.isAdmin,
    }, {headers : header}).catch((error) => {
        if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("L'utilisateur n'a pas été trouvé");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
        else if(error.response.status === 204){
            throw new Error("Utilisateur modifié");
        }
    });
    return response.data;
}
//GameCategories

const getGameCategories = async () => {
    const response = await axios.get(URL + "/gameCategory/", {headers : header}).catch((error) => {
        if (error.response.status === 404) {
            throw new Error("Les catégories de jeu n'ont pas été trouvées");
        } else if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        }
    });
    return response.data;
}

const getGameCategory = async (categoryId) => {
    const response = await axios.get(`${URL}/gameCategory/${categoryId}`, {headers : header}).catch((error) => {
        if (error.response.status === 400) {
            throw new Error("Erreur de syntaxe");
        } else if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        } else if (error.response.status === 404) {
            throw new Error("La catégorie de jeu n'a pas été trouvée");
        }
    });
    return response.data;
}

const addGameCategory = async (gameCategory) => {
    const response = await axios.post(`${URL}/gameCategory/`, {
        label : gameCategory.label,
        description: gameCategory.description
    }, {headers: header}).catch((error) => {
        if (error.response.status === 400) {
            throw new Error("Erreur de syntaxe");
        } else if (error.response.status === 500) {
            throw new Error("Erreur serveur");
        } else if (error.response.status === 403) {
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        } else if (error.response.status === 401) {
            throw new Error("Authentification nécessaire");
        } else if (error.response.status === 201) {
            throw new Error("Catégorie créée");
        }
    });
    return response.data;
}

const deleteGameCategory = async (gameCategoryId) => {
    const response = await axios.delete(`${URL}/gameCategory/${gameCategoryId}`, {
        headers : header
    }).catch((error) => {
        if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("La catégorie de jeu n'a pas été trouvée");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
        else if (error.response.status === 204)
            throw new Error("Catégorie supprimée");
    });
    return response.data;
}

const updateGameCategory = async (gameCategoryId,updatedGameCategory) => {
    const response = await axios.patch(`${URL}/gameCategory/${gameCategoryId}`, {
        label : updatedGameCategory.label,
        description: updatedGameCategory.description
    }, {headers: header}).catch((error) => {
        if (error.response.status === 204)
            throw new Error("Modification effectué");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 401)
            throw new Error("Authetification nécessaire");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("La catégorie de jeu n'a pas été trouvée");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

// Inscriptions

const getInscriptions = async () => {
    const response = await axios.get(`${URL}/inscription/`, {headers : header})
        .catch((error) => {
        if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 404)
            throw new Error("Les inscriptions n'a pas été trouvées");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

const getInscription = async (inscriptionId) => {
    const response = await axios.get(`${URL}/inscription/user/${inscriptionId}`, {headers : header}).catch((error) => {
        if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 401)
            throw new Error("Authetification nécessaire");
        else if (error.response.status === 404)
            throw new Error("L'inscription n'a pas été trouvée");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

const addInscription = async (addedInscription) => {
    const response = await axios.post(`${URL}/inscription/`,{userid: addedInscription.userid, eventId : addedInscription.eventId}, {headers : header}).catch((error) => {
        if (error.response.status === 201)
            throw new Error("Inscription créée");
        else if(error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 404)
            throw new Error("L'inscription ou l'utilisateur n'a pas été trouvé(e)");
        else if (error.response.status === 409)
            throw new Error("L'inscription existe déjà");
        else if (error.response.status === 418)
            throw new Error("Le nombre de participants à atteint sa limite");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
    });
    return response.data;
}

const deleteInscription = async (inscriptionId) => {
    const response = await axios.delete(`${URL}/inscription/${inscriptionId}`, {headers : header}).catch((error) => {
        if (error.response.status === 204)
            throw new Error("Inscription supprimée");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if(error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 404)
            throw new Error("L'inscription n'a pas été trouvée");
        else if (error.response.status === 401){
            throw new Error("Authentification nécessaire");
        }
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

const updateInscription = async (inscriptionId, addedInscription) => {
    const response = await axios.patch(`${URL}/inscription/${inscriptionId}`,{ userId : addedInscription.userId, eventId : addedInscription.eventId}, {headers : header})
        .catch((error) => {
            if (error.response.status === 204)
                throw new Error("Inscription modifiée");
            else if (error.response.status === 400)
                throw new Error("Erreur de syntaxe");
            else if(error.response.status === 403)
                throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
            else if (error.response.status === 404)
                throw new Error("L'inscription n'a pas été trouvée");
            else if (error.response.status === 401)
                throw new Error("Authentification nécessaire");
            else if (error.response.status === 500)
                throw new Error("Erreur serveur");
            return response.data;
    }
    )};

//Events
const getEvents = async () => {
    const response = await axios.get(`${URL}/event/`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Les événements n'ont pas été trouvés");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

const getPendingEvents = async () => {
    const response = await axios.get(`${URL}/event/pending/`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("Les événements n'ont pas été trouvés");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}
const getEvent = async (eventId) => {
    const response = await axios.get(`${URL}/event/${eventId}`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("L'événement n'a pas été trouvé");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

const addEvent = async (addedEvent) => {

    console.log(addedEvent);
    const response = await axios.post(`${URL}/event/`,
        {
            creatorid: addedEvent.creatorid,
            gamecategory : addedEvent.gamecategory,
            eventdate : addedEvent.eventdate,
            eventdescription : addedEvent.eventdescription,
            nbmaxplayer : addedEvent.nbmaxplayer,
            address : addedEvent.address

    }, {headers : header}).catch((error) => {
        if (error.response.status === 201)
            throw new Error("L'événement a été ajouté");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });

    return response.data;
}

const updateEvent = async (eventId, modifiedEvent) => {
    const response = await axios.patch(`${URL}/event/${eventId}`, {
        creatorId : modifiedEvent.creatorId,
        gameCategoryId : modifiedEvent.gameCategoryId,
        eventDate : modifiedEvent.eventDate,
        street : modifiedEvent.street,
        number : modifiedEvent.number,
        country : modifiedEvent.country,
        city : modifiedEvent.city,
        postalCode : modifiedEvent.postalCode,
        eventDescription : modifiedEvent.eventDescription,
        nbMaxPlayer : modifiedEvent.nbMaxPlayer,
        }, {headers : header}).catch((error) => {
            if (error.response.status === 404)
                throw new Error("L'événement n'a pas été trouvé");
            else if (error.response.status === 204)
                throw new Error("Evenemment modifié");
            else if (error.response.status === 400)
                throw new Error("Erreur de syntaxe");
            else if (error.response.status === 403)
                throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
            else if (error.response.status === 401)
                throw new Error("Authentification nécessaire");
            else if (error.response.status === 500)
                throw new Error("Erreur serveur");
            });
        return response.data;
};

const verifyEvent = async (eventid, verification) => {

    const response = await axios.patch(`${URL}/event/verify/${eventid}`,
        {
            adminMessage : verification.adminMessage,
            isVerified : verification.isVerified
        }, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("L'événement n'a pas été trouvé");
        else if (error.response.status === 204)
            throw new Error("Evenemment modifié");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if (error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

const deleteEvent = async (eventId) => {
    const response = await axios.delete(`${URL}/event/${eventId}`, {headers : header}).catch((error) => {
        if (error.response.status === 404)
            throw new Error("L'événement n'a pas été trouvé");
        else if (error.response.status === 204)
            throw new Error("Evenemment supprimé");
        else if (error.response.status === 400)
            throw new Error("Erreur de syntaxe");
        else if (error.response.status === 403)
            throw new Error("L'action demandée ne peut être réalisée que par un administrateur");
        else if (error.response.status === 401)
            throw new Error("Authentification nécessaire");
        else if (error.response.status === 500)
            throw new Error("Erreur serveur");
    });
    return response.data;
}

export {
    login,
    getUsers,
    getGameCategories,
    getGameCategory,
    deleteGameCategory,
    updateGameCategory,
    getUser,
    addUser,
    deleteUser,
    updateUser,
    grantUser,
    getInscriptions,
    getInscription,
    addInscription,
    deleteInscription,
    updateInscription,
    getEvents,
    getPendingEvents,
    getEvent,
    addGameCategory,
    addEvent,
    updateEvent,
    verifyEvent,
    deleteEvent
}