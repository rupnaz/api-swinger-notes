import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:8000/api',
  schemes: ['http'],
  definitions: {
    authModel: {
        username: "binguszs",
        password: "stinguss"  
    },
    authResponse: {
      success: true,
      token: "jwt token"
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/user.js', './routes/notes.js'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);