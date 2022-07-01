const fs = require('fs');
const path = require('path');

// Criar uma pasta
// fs.mkdir(path.join(__dirname, '/test'), (error) => {
//     if (error){
//         console.log('Erro: ', error);
//     }

//     console.log('Pasta criada com sucesso');
// });

// CRIAR UM ARQUIVO
fs.writeFile(path.join(__dirname, '/test','teste.html'), '<p>Novo parágrafo 1</p>', (error)=> {
    if (error){
        return console.log("Erro: ", error);
    }
    console.log("Arquivo criado com sucesso");

    // ADICIONAR À UM ARQUIVO
    fs.appendFile(path.join(__dirname, '/test', 'teste.html'),'<p>Novo parágrafo 2</p>', (error) => {
        if(error){
            console.log('Erro: ', error);
        }

        console.log('Conteúdo adicionado ao arquivo teste.html com sucesso!');
    });

    // LER ARQUIVO
    fs.readFile(path.join(__dirname, 'test','teste.html'), 'utf-8',(error, data) => {
        if(error){
            return console.log("Erro: ", error);
        }

        console.log(data);
    });
});

