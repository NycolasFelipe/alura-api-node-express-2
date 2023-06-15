import livros from "../models/Livro.js";
import NaoEncontrado from "../errors/NaoEncontrado.js";

class LivrosController {
  static listarLivros = async (req, res, next) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();
      res.status(200).json(livrosResultado);
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      let livro = await livros.findById(id).populate("autor", "nome").exec();

      if (livro !== null) {
        res.status(200).send(livro);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).json(livro);
    } catch (err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      let livro = await livros.findByIdAndUpdate(id, {$set: req.body});

      if (livro !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso."});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id;
      let livro = await livros.findByIdAndDelete(id);
      if (livro !== null) {
        res.status(200).send({message: "Livro excluído com sucesso."});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      let livro = await livros.find({"editora": editora});
      if (livro !== null) {
        res.status(200).send(livro);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    } catch (err) {
      next(err);
    }
  };
}

export default LivrosController;