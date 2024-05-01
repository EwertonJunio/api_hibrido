const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conexão com o MongoDB estabelecida com sucesso');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error.message);
});

mongoose.connection.on('error', (error) => {
    console.error('Erro de conexão com o MongoDB:', error.message);
});

mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do MongoDB');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;
