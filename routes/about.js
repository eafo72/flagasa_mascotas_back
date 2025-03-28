/* Importing the express module and creating an instance of it. */
const express = require("express");
const app = express.Router();
const Nosotros = require("../models/Nosotros");

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
    const nosotros = await Nosotros.find({});
    res.json({ nosotros });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error obteniendo los datos" });
  }
});

// SINGLE
app.get("/single/:id", async (req, res) => {
  try {
    const single = await Nosotros.findById(req.params.id);
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

// CREAR
app.post("/crear", async (req, res) => {
  const { texto, mision, vision } = req.body;

  try {
    const nuevoItem = await Nosotros.create({
      texto,
      mision,
      vision,
    });
    res.json(nuevoItem);
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error guardando los datos" + error,
    });
  }
});

// ACTUALIZAR
app.put("/actualizar", async (req, res) => {
  const {
    id,
    texto,
    mision,
    vision,
    bannername,
    bannerbase64,
    name,
    imgbase64,
  } = req.body;

  let tituloImage = '';
  if (imgbase64 != null) {
    let file_extension = name.split(".").pop();
    tituloImage = `imagen-nosotros.${file_extension}`;

    let formdata = new FormData();
    formdata.append("thumb", imgbase64);
    formdata.append("nombre_thumb", tituloImage);

    let response = await fetch(
      `${process.env.URLFRONT}/banners/api_banners_base64.php`,
      {
        method: "POST",
        body: formdata,
      }
    );

    let result = await response.json();

    if (result.error) {
      return res.status(500).json({
        error: true,
        msg: "No se agregó la imagen, inténtalo nuevamente",
        details: result.error,
      });
    }
  }
  let tituloBanner = '';
  if (bannerbase64 != null) {
    let file_extension = bannername.split(".").pop();
    tituloBanner = `banner-nosotros.${file_extension}`;

    let formdata = new FormData();
    formdata.append("thumb", bannerbase64);
    formdata.append("nombre_thumb", tituloBanner);

    let response = await fetch(
      `${process.env.URLFRONT}/banners/api_banners_base64.php`,
      {
        method: "POST",
        body: formdata,
      }
    );

    let result = await response.json();

    if (result.error) {
      return res.status(500).json({
        error: true,
        msg: "No se agregó el banner, inténtalo nuevamente",
        details: result.error,
      });
    }
  }

  const updateData = {
    texto,
    mision,
    vision,
  };

  if (imgbase64 != null) {
    updateData.imagen = `${process.env.URLFRONT}/banners/${tituloImage}`;
  }
  if (bannerbase64 != null) {
    updateData.banner = `${process.env.URLFRONT}/banners/${tituloBanner}`;
  }

  try {
    const updateItem = await Nosotros.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.json(updateItem);
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error actualizando la infomación " + error,
    });
  }
});

// BORRAR
app.post("/borrar", async (req, res) => {
  const { id } = req.body;

  try {
    const deleteItem = await Nosotros.findByIdAndRemove({ _id: id });
    res.json(deleteItem);
  } catch (error) {
    res.status(500).json({
      msg: "Hubo un error borrando la información",
    });
  }
});

module.exports = app;
