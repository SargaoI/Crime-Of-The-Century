const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');

const app = express();

// Importar as rotas do arquivo routes.js
const routes = require('./routes');

// Outras configurações e middlewares...
app.use(express.json()); // Para análise de conteúdo JSON
app.use(express.urlencoded({ extended: false })); // Para análise de dados de formulário

app.use(
    session({
      secret: 'segredo', // Segredo usado para assinar o cookie da sessão
      resave: false,
      saveUninitialized: false
    })
  );

    app.use(flash());
    app.use((req,res,next)=>{
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    })



// Registrar as rotas
app.use(routes);

// Configuração do Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/testBlog',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// Configuração do Handlebars
//Handelbars Middleware
//app.engine('handlebars', engine());
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

// Inicialização do servidor
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
