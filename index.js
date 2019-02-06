const mysql = require('mysql');

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
