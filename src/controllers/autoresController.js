import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutoresController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      let autor = await autores.findById(id).exec();
      
      if (autor !== null) {
        res.status(200).send(autor);
      } else {
        res.status(404).send({message : "Id do autor não localizado."});
      }
    } catch (err) {
      if (err instanceof mongoose.Error.CastError) {
        res.status(400).send({message: "Um ou mais dados fornecidos estão incorretos."});
      } else {
        res.status(500).send({message: "Erro interno de servidor."});
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).json(autor);
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso."});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };

  static excluirAutor = async (req, res) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor excluído com sucesso."});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };
}

export default AutoresController;