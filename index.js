const express = require('express');
const { sequelize } = require('./src/models');

const app = express()
const port = 3000

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.listen(port, async () => {
    console.log('Servidor corriendo en el puerto', 3000)})