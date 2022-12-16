const express = require("express");
const router = express.Router();
const push = require('./push');

const mensajes = [
    {
        _id : "1",
        user: "mario",
        mensaje : "mensaje numero uno"
    },
    {
        _id : "2",
        user: "Carlos",
        mensaje : "mensaje numero dos"
    },
    {
        _id : "3",
        user: "antonio",
        mensaje : "mensaje numero tres"
    }
];

router.get( "/" , (req, resp) =>{
    resp.json( mensajes );
});

router.post( "/" , (req, resp) =>{

    const mensaje = {
        mensaje : req.body.mensaje,
        user : req.body.user,
        lat: req.body.lat,
        lng: req.body.lng,
        foto: req.body.foto
    }

    mensajes.push( mensaje );

    console.log("Mis mensajes:" , mensajes);

    resp.json( {
        ok : true,
        mensaje
    } );
});

 router.get('/key', (req, res) => {
  
    const key = push.getKey();
    // res.send(key);
    res.send( key);
  
  });

// Almacenar la suscripción
router.post('/subscribe', (req, res) => {

    const subscripcion = req.body;
    push.addSubscription( subscripcion );
     res.json('suscribe');
  
  });
  
  router.post('/push', (req, res) => {
  
    const post = {
      titulo: req.body.titulo,
      cuerpo: req.body.cuerpo,
      usuario: req.body.usuario
    };
    push.sendPush( post );
    res.json( post );

    //res.json('push notification');
  
  });

module.exports = router;