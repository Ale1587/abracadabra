let express = require('express');
let app = express()

const JSON = {
    usuarios: [
        'andres',
        'olivia',
        'alejandra',
        'javier',
        'cristian',
        'ricardo',
        'francisco',
        'Eduardo',
        'rebeca',
        'cristina'
    ]
}

// 1. Crear un servidor con Express en el puerto 3000.
app.listen(3000, () => console.log('Server On'))

// 2. Definir la carpeta “assets” como carpeta pública del servidor.
app.use(express.static('assets'))


// 3. Crear en el servidor un arreglo de nombres y devolverlo en formato JSON a través de la ruta /abracadabra/usuarios .
app.get('/abracadabra/usuarios', (req, res) =>{
    res.json( JSON  )
})

// 4. Crear un middleware con la ruta /abracadabra/juego/:usuario para validar que el usuario recibido como parámetro “usuario” existe en el arreglo de nombres creado en el servidor.
app.use('/abracadabra/juego/:usuario', (req, res, next) =>{
    
    const { usuario } = req.params

    usuario == JSON.usuarios.find( e => usuario == e)
    ? next()
    : res.sendFile(__dirname + '/assets/who.jpeg')
   
})

app.get('/abracadabra/juego/:usuario', (req, res) =>{
    res.redirect('/abracadabra/conejo')
})


// servidor de la página estatica
app.get('/abracadabra/conejo', (req, res) =>{
    res.sendFile(__dirname + '/index.html')
})

// 5. Crear una ruta /abracadabra/conejo/:n que valide si el parámetro “n” coincide con el número generado de forma aleatoria. En caso de ser exitoso, devolver la imagen del conejo, de lo contrario devolver la imagen de Voldemort.
app.get('/abracadabra/conejo/:n', (req, res) =>{

    const n = Math.floor(Math.random() * (5-1)) + 1;
    const numero = req.params.n

    numero == n 
    ? res.sendFile(__dirname + '/assets/conejito.jpg')
    : res.sendFile(__dirname + '/assets/voldemort.jpg')
})

// 6. Crear una ruta genérica que devuelva un mensaje diciendo “Esta página no existe...” al consultar una ruta que no esté definida en el servidor.
app.get('*', (req, res) =>{
    res.send('404 no Found -- la página que busca no existe')
})