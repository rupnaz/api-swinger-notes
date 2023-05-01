import { nanoid } from 'nanoid';
import Datastore from 'nedb-promise';
import { hashPassword } from '../utils/utils.js';

const usersDatabase = new Datastore({ filename: 'database/users.db', autoload: true });
const notesDatabase = new Datastore({ filename: 'database/notes.db', autoload: true });
const nanoId = nanoid()


const createUser = async (credentials) =>{
    const pass = await hashPassword(credentials.password);

    usersDatabase.insert
    ({
        nanoId: nanoId,
        username: credentials.username,
        password: pass
    })
}

const userExists = async (username) => {
    return await usersDatabase.findOne({ username: username });
}

const findByID = async (userId) => {
    return await usersDatabase.findOne({ nanoId: userId});
}

export { usersDatabase, notesDatabase, createUser, userExists, findByID };