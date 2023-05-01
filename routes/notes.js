import { Router } from 'express';
import { verify } from '../middleware/userValidation.js';
import { createNote, findByID, updateNote, deleteNote } from '../model/notesModel.js';


const router = Router()


router.post('/', verify, (req, res) => {
    const note = req.body;
    note.userId = req.id
    createNote(note)

    res.json({ success: true })
})

router.put('/', verify, async (req, res) => {
    const note = req.body;
    note.userId = req.id

    const updatedNote = updateNote(note)

    res.json({ success: true, note: updatedNote })
})

router.delete('/', verify, async (req,res) => {
    const nanoId = req.body.nanoId
    const deleted = await deleteNote(nanoId)
    res.json({success: deleted})
})

router.get('/', verify, async (req, res) => {
    const notes = await findByID(req.id)
    res.json({ success: true, notes: notes })
})



export default router;