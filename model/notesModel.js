import { nanoid } from 'nanoid';
import Datastore from 'nedb-promise';



const notesDatabase = new Datastore({ filename: 'database/notes.db', autoload: true });


const createNote = async (note) =>{

    notesDatabase.insert
    ({
        nanoId: nanoid(),
        userId: note.userId,
        title: note.title,
        text: note.text,
        createdAt: new Date(),
        modifiedAt: new Date()
    })
}

const updateNote = async (note) => {
  await notesDatabase.update({ nanoId:note.nanoId }, { $set: {title: note.title, text: note.text, modifiedAt: new Date() }})
  const newNote = await notesDatabase.findOne({ nanoId:note.nanoId })
  return newNote;
}

const deleteNote = async (nanoId) => {
    await notesDatabase.remove({nanoId:nanoId})
    return true;
}

const findByID = async (userId) => {
    return await notesDatabase.find({ userId: userId});
}

export { notesDatabase, createNote, findByID, updateNote, deleteNote };