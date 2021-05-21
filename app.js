const express = require("express"); //copia do framework - tudo que for do express esta aqui
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mongoose = require("mongoose");
const app = express();
const path = require("path"); //manipulacao de diretorios

require("dotenv").config();

//chamando o banco
require("./model/Users.js");
require("./model/Post.js");
const Users = mongoose.model("Users"); //tabela usuarios
const Post = mongoose.model("Post"); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser.
app.use(cookieParser());

// Handlebars
app.engine("handlebars", handlebars({ defaultLayout: false }));
app.set("view engine", "handlebars");

// Mongoose
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/mongo-web")
  .then(() => {
    console.log("MongoDB conectado");
  })
  .catch(err => {
    console.log("Houve um erro ao se conectar ao mongoDB: " + err);
  });

  // Postagens Controller
const PostagensController = require("./controller/Post");

// Public -- arquivos de img e css
app.use(express.static(path.join(__dirname, "public")));

// Inicializa o express-session para que possamos identificar os usuários logados.
app.use(
    session({
      key: "user_sid",
      secret: "WebProject",
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 600000 //10min
      }
    })
  );

  // Esse middleware vai checar se o cookie do usuário ainda está salvo no navegador e o usuário não está no server, então iremos deslogar ele.
app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie("user_sid");
    }
    next();
  });

  // Função que checa os usuários logados
var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/home");
    } else {
      next();
    }
  };

// Rota principal - Main route
// Verifica se o usuário está logado, se estiver redireciona para página inicial
app.get("/", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      res.redirect("/index");
    } else {
      res.sendFile(__dirname + "/index.html");
    }
  });
  
  // Rota principal quando logado - Main route when loggedin
app.get("/", (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
      // carregar as noticias
      PostagensController.listarNoticias(req, res);
    } else {
      res.redirect("/login");
    }
  });


  // Rota de busca - Search route
//app.get("/buscar", async (req, res) => {
  //  let noticias = await PostagensController.buscarNoticias(req.query.searchTerm);
  
    //if (req.query.searchTerm === "") {
   //   noticias = await PostagensController.listarTodasNoticias();
    //}
  
    //res.send(noticias);
  //});

  // Rota para postar novas noticias
app.get("/nova", (req, res) => {
    res.render("salvar");
  });
  
  // Rota que salva noticias
app.post("/noticias", (req, res) => {
    PostagensController.salvarNoticias(req, res);
  });

  ////////////////
app.post("/signIn", function(req, res) {
    // Verifica se algum dos parametros vindos da requisição é null, undefined ou vazio
    if (!req.body.password || !req.body.email) {
      res.send({ status: 0, msg: "Algo deu errado" });
    } else {
      // Busca pelo email digitado no banco
      Users.where({ email: req.body.email }).findOne(function(err, user) {
        // Caso o usuário exista
        if (user) {
          // Compara a senha digitada com o hash do banco
              req.session.user = user;
              // Caso a senha esteja correta, cria a seção com cookies
              // TODO:Create session with cookies
              console.log("Login realizado com sucesso!");
              res.send({ status: 1, msg: "Login realizado com sucesso!" });
          
        } else {
          res.send({ status: 0, msg: "Usuário inexistente!" });
        }
      });
    }
  });

  // Rota de cadastro - Register route
app.post("/createUser", async (req, res) => {
    // Verifica se algum dos parametros vindos da requisição é null, undefined ou vazio
        const newUser = {
          nome: req.body.nome,
          email: req.body.email,
          senha: req.body.senha
        };
        // Verifica se o nome de usuário já está em uso.
        // OBS.: Não precisavamos fazer isso, o banco já faz isso, só fazemos está verificação para informar melhor o erro ao usuário.
        Users.where({ nome: req.body.nome }).findOne(function(err, user) {
          if (user) {
            res.send({ msg: "Erro ao cadastrar usuario! Nome já em uso" });
          } else {
            // Caso esteja tudo ok com o nome de usuário, verifica se o email já está em uso.
            // OBS.: Não precisavamos fazer isso, o banco já faz isso, só fazemos está verificação para informar melhor o erro ao usuário.
            Users.where({ email: req.body.email }).findOne(function(
              err,
              user
            ) {
              if (user) {
                console.log("Erro ao cadastrar usuario! Email já em uso");
                res.send({ msg: "Erro ao cadastrar usuario! Email já em uso" });
              } else {
                // Caso esteja TUDO ok, salva no banco
                new Users(newUser)
                  .save()
                  .then(() => {
                    console.log("Cadastro realizado com sucesso!");
                    res.send({ msg: "Cadastro realizado com sucesso!" });
                  })
                  .catch(err => {
                    console.log("Erro ao cadastrar usuario!");
                    res.send({ msg: "Erro ao cadastrar usuario!" });
                  });
                }
              });
            }
          });
      
    });
  
  //outros
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Servidor rodando na porta" + PORT);
  });