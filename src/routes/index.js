import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";

const routes = (app) => {
  app.use(
    livros,
    autores
  );
};

export default routes;