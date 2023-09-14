const Post = require("../models").Post;
const User = require("../models").User;
const controller = {};

controller.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: "Autor",
        },
      ],
    });
    //res.status(200).json(posts);
    return res.render("post", { posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al buscar Posts" });
  }
};

controller.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.render("common/error", {
        error: "Post no encontrado.",
        status: 404,
      });
    }

    return res.render("post/post", { post });
  } catch (error) {
    console.log(error);
    return res.render("common/error", {
      error: "Error al obtener los post",
      status: 500,
    });
  }
};

controller.renderCreatePost = (req, res) => {
  return res.render("post/create");
};

controller.createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al crear Post" });
  }
};

controller.renderUpdatePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.render("common/error", {
        error: "El usuario no existe",
        status: 404,
      });
    }

    return res.render("post/update", { post });
  } catch (error) {
    console.log(error);
    return res.render("common/error", {
      error: "Error en el sistema",
      status: 500,
    });
  }
};

controller.updatePost = async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido, imagen } = req.body;
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.render("common/error", {
        error: "El post no existe",
        status: 404,
      });
    }

    post.titulo = titulo;
    post.contenido = contenido;
    post.imagen = imagen;
    await post.save();
    return res.redirect("/post");
  } catch (error) {
    console.log(error);
    return res.render("common/error", {
      error: "Error en el sistema",
      status: 500,
    });
  }
};

controller.renderDeletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.render("common/error", {
        error: "Post no encontrado.",
        status: 404,
      });
    }

    await post.destroy();
    return res.redirect("/post");
  } catch (error) {
    console.log(error);
    return res.render("common/error", {
      error: "Error eliminar post",
      status: 500,
    });
  }
};

controller.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: "Post no encontrado." });
    }

    await post.destroy();
    return res.status(200).json({ message: "Post eliminado exitosamente" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener los posts" });
  }
};

module.exports = controller;
