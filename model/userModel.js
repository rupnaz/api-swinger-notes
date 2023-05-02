import { nanoid } from 'nanoid';
import Datastore from 'nedb-promise';
import { hashPassword } from '../utils/utils.js';

const usersDatabase = new Datastore({ filename: 'database/users.db', autoload: true });
const notesDatabase = new Datastore({ filename: 'database/notes.db', autoload: true });
const nanoId = nanoid()


const createUser = async (credentials) =>{
    const pass = await hashPassword(credentials.password);
const userToCreate = {
    nanoId: nanoId,
    username: credentials.username,
    password: pass
}
    usersDatabase.insert(userToCreate)
    return userToCreate;

}



const userExists = async (username) => {
    return await usersDatabase.findOne({ username: username });
}

const findByID = async (userId) => {
    return await usersDatabase.findOne({ nanoId: userId});
}

export { usersDatabase, notesDatabase, createUser, userExists, findByID };