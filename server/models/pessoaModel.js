var Mongoose = require('Mongoose');

var db = Mongoose.connection;

Mongoose.createConnection('mongodb://localhost/rotas');

//create schema
var pessoaSchema = new Mongoose.Schema({
	nome: String,
	cpf: String,
	altura: Number,
	sexo: String, 
	peso: Number,
	idade: Number,
	posicaoVeiculo: String,
	posicaoFamiliar: String
});

var PessoaDB = Mongoose.model('PessoaDB', pessoaSchema);

var savePessoa = function(Pessoa){
	return new Promise(function(resolve, reject){
		var save = new PessoaDB(Pessoa);

		save.save(function(err, pessoa){
			if(err) return console.error(err);
			resolve(pessoa);
		});
	})
}

var deletePessoa = function(id){
	return new Promise(function(resolve, reject){
		PessoaDB.remove({_id: id}, function(err, pessoa){
			if (err)
				console.log(err);
			resolve(pessoa);
		})
	});
}

var updatePessoa = function(Pessoa){
	return new Promise(function(resolve, reject){
		PessoaDB.update(
			{_id: Pessoa._id}, 
			{
				nome: Pessoa.nome,
				cpf: Pessoa.cpf,
				altura: Pessoa.altura,
				sexo: Pessoa.sexo,
				peso: Pessoa.peso,
				idade: Pessoa.idade,
				posicaoVeiculo: Pessoa.posicaoVeiculo,
				posicaoFamiliar: Pessoa.posicaoFamiliar
			},
			{
				multi: true
			},
			function(err, pessoa){
				if(err) return 
					console.error(err);
				resolve(pessoa);
			}
		);
	})
}

var getPessoa = function(){
	return new Promise(function(resolve, reject){
		PessoaDB.find(function(err, pessoa){
			if (err)
				console.log(err);
			resolve(pessoa);
		});
	})
}

module.exports = {
	savePessoa: savePessoa,
	deletePessoa: deletePessoa,
	updatePessoa: updatePessoa,
	getPessoa: getPessoa
}