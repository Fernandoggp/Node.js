const { json } = require("express")
const fs = require("fs")

function getTodosLivros(){
    return JSON.parse(fs.readFileSync("livros.json"))
}

function getLivroPorId(id){
    const livros = JSON.parse(fs.readFileSync("livros.json"))

  const livroFiltrado = livros.filter(livro => livro.id === id)
  return livroFiltrado
}

function insereLivro(livroNovo){
    const livros = JSON.parse(fs.readFileSync("livros.json"))

    const novaListaDeLivros = [...livros, livroNovo]

    fs.writeFileSync("livros.json" , JSON.stringify(novaListaDeLivros))
}

function modificaLivro(modificacoes , id){
    let livrosAtuais = JSON.parse(fs.readFileSync("livros.json"))
    const indiceModificado = livrosAtuais.findIndex(livro => livro.id === id)
    
    const conteudoMudado = {  ...livrosAtuais[indiceModificado], ...modificacoes}
    // livrosAtuais[indiceModificado] => {id: "2", nome: "livro irado"}
    //modificacoes => {nome: "livro mucho legal"}

    livrosAtuais[indiceModificado] = conteudoMudado

    fs.writeFileSync("livros.json", JSON.stringify(livrosAtuais))

}

function deletaLivro (id){
    const livro = JSON.parse(fs.readFileSync("livros.json"))

    const livroFiltrado = livro.filter(livro => livro.id !== id)
    fs.writeFileSync("livros.json" , JSON.stringify(livroFiltrado))
}

module.exports = {
    getTodosLivros,
    getLivroPorId,
    insereLivro,
    modificaLivro,
    deletaLivro
}
