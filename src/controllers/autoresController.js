import autores from "../models/Autor.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class AutoresController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (err) {
      next(err);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      let autor = await autores.findById(id).exec();
      
      if (autor !== null) {
        res.status(200).send(autor);
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);
      await autor.save();
      res.status(201).json(autor);
    } catch (err) {
      next(err);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      let autor = await autores.findByIdAndUpdate(id, {$set: req.body});

      if (autor !== null) {
        res.status(200).send({message: "Autor atualizado com sucesso."});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      let autor = await autores.findByIdAndDelete(id);
      
      if (autor !== null) {
        res.status(200).send({message: "Autor excluído com sucesso."});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch (err) {
      next(err);    
    }
  };
}

export default AutoresController;