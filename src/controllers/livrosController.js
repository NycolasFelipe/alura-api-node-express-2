import livros from "../models/Livro.js";

class LivrosController {
  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find().populate("autor").exec();
      res.status(200).json(livrosResultado);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const id = req.params.id;
      let livro = await livros.findById(id).populate("autor", "nome").exec();
      res.status(200).send(livro);
    } catch (err) {
      res.status(400).send({message : `${err.message} - Id do livro não localizado.`});
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      await livro.save();
      res.status(201).json(livro);
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "Livro atualizado com sucesso."});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const id = req.params.id;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro excluído com sucesso."});
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;
      let livro = await livros.find({"editora": editora}, {});
      res.status(200).send(livro);
    } catch (err) {
      res.status(500).send({message: err.message});
    }
  };
}

export default LivrosController;