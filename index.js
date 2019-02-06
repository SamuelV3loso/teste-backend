const requires = require('./resourcesSql');

const mysql = require('mysql');

const express = require('express');

var app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'mysql',//senha root do banco
    database: 'desafio'//nome do banco que deseja persistir
  });
  
  //Iniciando a conexão com o bd
  mysqlConnection.connect((err)=>{
    if(!err)
    console.log('DB connection succeded.');
    else
    console.log('DB connection failed \n Error:' + JSON.stringify(err,undefined, 2));
  })

app.listen(3000, ()=>console.log('Express server is running at: 3000'));

app.get('/avg',(req,res)=>{
    mysqlConnection.query(requires.getTotal(),(err, regionals, fields)=>{
      if(!err){
        mysqlConnection.query(requires.getNational(),(err, national, fields)=>{
          if(!err){
            var dados = '{ "regionals": ' +JSON.stringify(regionals) + ' }';
            res.send(Object.assign({}, JSON.parse(dados), national[0]));
          }
          else
          console.log(err);
        })
      }
      else
      console.log(err);
    })
  })