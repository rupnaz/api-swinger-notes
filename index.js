import express from 'express';
import swaggerFile from './swagger-output.json' assert {type: 'json'}
import swaggerUi from 'swagger-ui-express'

import notesRouter from './routes/notes.js'
import userRouter from './routes/user.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use('/api', userRouter);
app.use('/api', notesRouter);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))



app.listen(PORT, () => {
  console.log(`Server started (PORT: ${PORT})`);
});
