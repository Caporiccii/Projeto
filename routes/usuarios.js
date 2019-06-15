// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.Senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from cad where nome='${login}' and senha ='${senha}'`);

  }).then(consulta => {

    console.log(`Usuários encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length == 1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});

router.post('/cadastrar', function (req, res, next) {

  var nome;
  var sobrenome;
  var datanasc;
  var email;
  var senha;

  var cpf;
  var cep;
  var lograd;
  var cadastro_valido = false;

  banco.conectar().then(() => {
    console.log(`Chegou p/ cadastro: ${JSON.stringify(req.body)}`);

    nome = req.body.nomecad;
    sobrenome = req.body.sobre;
    rg = req.body.rg;
    email = req.body.email;
    senha = req.body.senhacad;

    cpf = req.body.cpf;
    cep = req.body.cep;
    uf = req.body.uf;



    if (email == undefined || senha == undefined || nome == undefined) {
      // coloque a frase de erro que quiser aqui. Ela vai aparecer no formulário de cadastro
      throw new Error(`Dados de cadastro não chegaram completos: ${email} / ${senha} / ${nome}/ ${sobrenome}/ ${rg} / ${cpf} / ${cep}/ ${lograd} / ${uf}`);
    }
    return banco.sql.query(`select count(*) as contagem from cad where email = '${email}'`);
  }).then(consulta => {

    if (consulta.recordset[0].contagem >= 1) {
      // status 400 - erro do usuário
      res.status(400).send(`O email "${email}" já esta em uso.`);
      return;
    } else {
      console.log('válido!');
      cadastro_valido = true;
    }

  }).catch(err => {

    var erro = `Erro no cadastro: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    if (cadastro_valido) {

      banco.sql.query(`insert into cad (nome,sobre,cpf,rg,email,senha,cep,uf)
      values ('${nome}','${sobrenome}','${cpf}','${rg}','${email}','${senha}','${cep}','${uf}');`).then(function () {

        // banco.sql.query(`insert into Cliente (nome_cliente,sobrenome_cliente,dataNasc,email_cliente,senha_cliente)
        // values ('${nome}','${sobrenome}','${datanasc}','${email}','${senha}');`).then(function () {
        console.log(`Cadastro criado com sucesso!`);
        res.sendStatus(201);
        // status 201 significa que algo foi criado no back-end, 
        // no caso, um registro de usuário ;)		


        var erro = `Erro no cadastro: ${err}`;
        console.error(erro);
        // status 500 - erro
        res.status(500).send(erro);

      }).finally(() => {
        banco.sql.close();
      });
    }
  });


});

// não mexa nesta linha!
module.exports = router;