const express = require('express');
const { sequelize } = require('./src/models');
const cors = require('cors');
const morgan = require('morgan');
const userRoutes = require('./src/routes/user.routes.js')
const postRoutes = require('./src/routes/post.routes.js')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))

app.use('/user', userRoutes)
app.use('/post', postRoutes)

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito");
  })
  .catch((error) => {
    console.error("Error al conectar con la base de datos:", error);
  });

  app.get('/', function(req, res) {
    res.render('base/index');});

  app.listen(port, async () => {
    console.log(`Servidor corriendo en el puerto ${port}`)})