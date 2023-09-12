const express = require('express')

const app = express()
const port = 3000

app.listen(port, async () => {
    console.log('Servidor corriendo en el puerto ${port}')})