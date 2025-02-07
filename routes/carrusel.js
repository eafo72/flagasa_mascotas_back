/* Importing the express module and creating an instance of it. */
const express = require("express");
const app = express.Router();
const Carrusel = require("../models/Carrusel");

const imageController = require("../controller/imageController");
let FormData = require("form-data");
const fs = require("fs");
const fetch = require("node-fetch");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authorization");

// LISTA
app.get("/obtener", async (req, res) => {
  try {
    const carrusel = await Carrusel.find({});
    res.json({ carrusel });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error obteniendo los datos" });
  }
});


// SINGLE
app.get("/single/:id", async (req, res) => {
  try {
    const single = await Carrusel.findById(req.params.id);
    res.json({ single });
  } catch (error) {
    res.status(500).json({
      msg:
        "Hubo un error obteniendo los datos del id " +
        req.params.id +
        " error: " +
        error,
    });
  }
});


// ACTUALIZAR
app.put("/actualizar", imageController.upload, async (req, res) => {
  const { id, titulo, subtitulo, enlace } = req.body;

  if (req.files.length != 0) {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let tituloImage = `${date}-${req.files[0].originalname}`;
    let thumb = `${process.env.URLFRONT}/carrusel/${tituloImage}`;

    let file = fs.readFileSync(req.files[0].path, { encoding: "base64" });

    let formdata = new FormData();
    formdata.append("thumb", file);
    formdata.append("nombre_thumb", tituloImage);

    let response = await fetch(
      `${process.env.URLFRONT}/carrusel/api_carrusel_base64.php`,
      {
        method: "POST",
        body: formdata,
      }
    );

    let result = await response.json();

    if (result.error) {
      return res.status(500).json({
        error: true,
        msg: "No se agregó la foto, inténtalo nuevamente",
        details: result.error,
      });
    }

    try {
                 
        const updateCarrusel = await Carrusel.findByIdAndUpdate(
          id,
          {
            titulo,
            subtitulo,
            enlace,
            imagen: thumb,
          },
          { new: true }
        );
     
        res.json({ updateCarrusel });
      
    } catch (error) {
      res.status(500).json({
        msg: "Hubo un error actualizando el Carrusel " + error,
      });
    }

  } else {
    try {
       
        const updateCarrusel = await Carrusel.findByIdAndUpdate(
          id,
          {
            titulo,
            subtitulo,
            enlace
          },
          { new: true }
        );

       res.json({ updateCarrusel });
    
    } catch (error) {
      res.status(500).json({
        msg: "Hubo un error actualizando el Carrusel " + error,
      });
    }
  }
});



module.exports = app;
