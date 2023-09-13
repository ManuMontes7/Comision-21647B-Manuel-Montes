const express = require('express');
const { sequelize } = require('./src/models');
const mainRoutes = require('./src/routes/main.routes.js')
const userRoutes = require('./src/routes/user.routes')
const postRoutes = require('./src/routes/post.routes')

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', __dirname + '/src/views')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/main', mainRoutes)
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

  app.get('/', (req, res) => {
    res.send('hello world')
  })

  app.listen(port, async () => {
    console.log('Servidor corriendo en el puerto', 3000)})