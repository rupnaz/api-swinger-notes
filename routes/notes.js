import { Router } from 'express';
import { verify } from '../middleware/userValidation.js';
import { createNote, findByID, updateNote, deleteNote } from '../model/notesModel.js';
import { checkNote } from '../middleware/noteValidation.js';

const router = Router()


router.post('/notes', verify, checkNote, (req, res) => {
    const note = req.body;
    note.userId = req.id
    createNote(note)

    res.json({ success: true })
})

router.put('/notes', verify, checkNote, async (req, res) => {
    const note = req.body;
    note.userId = req.id

    const updatedNote = updateNote(note)

    res.json({ success: true, note: updatedNote })
})

router.delete('/notes', verify, async (req,res) => {
    const nanoId = req.body.nanoId
    const deleted = await deleteNote(nanoId)
    res.json({success: deleted})
})

router.get('/notes', verify, async (req, res) => {
    const notes = await findByID(req.id)
    res.json({ success: true, notes: notes })
})



export default router;