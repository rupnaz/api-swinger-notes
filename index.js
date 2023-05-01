import express from 'express';

import notesRouter from './routes/notes.js'
import userRouter from './routes/user.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/api/user', userRouter);
app.use('/api/notes', notesRouter);



app.listen(PORT, () => {
  console.log(`Server started (PORT: ${PORT})`);
});
