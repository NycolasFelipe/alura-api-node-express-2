import autores from "../models/Autor.js";

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
        res.status(404).send({message : "Id do autor não localizado."});
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
      await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Autor atualizado com sucesso."});
    } catch (err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor excluído com sucesso."});
    } catch (err) {
      next(err);    
    }
  };
}

export default AutoresController;