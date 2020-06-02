const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://pedro:16112000@cluster0-evjgf.mongodb.net/devfindr?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json());
app.use(routes);

app.listen(3333);

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:
//Query Params: req.query (filtros, ordenação, paginação, ...)
//Route Params: req.params (Identificar um recurso na alteração ou remoção)
//Body: req.body (Dados para ciração ou alteração de um registro)
