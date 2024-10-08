let drawnNumList = [];
let maxNumber = 100;
let numSecreto = randNumGenerator();
let tryNum = 1;
console.log(numSecreto);
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do número secreto';
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

// --- FUNÇÃO DE EDIÇÃO DE TEXTO DO HTML ---
function htmlTextEditor(tag, texto){
    campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// --- INICIALIZADOR DO HTML ---
//COM O USO DE ARROW FUNCTION
let inicialMsg = () => {
    htmlTextEditor('h1', 'Jogo do numero secreto'); 
    htmlTextEditor('p', 'Escolha um numero entre 1 e 100');
}

inicialMsg();

// --- GERADOR DE NUMERO ALEATÓRIO --- 
// SEM REPETIR USANDO FUNÇÃO RECURSIVA E ADICIONANDO O NUMERO NA LISTA
function randNumGenerator(){
    let numOfListElements = drawnNumList.length;
    let drawnNum = parseInt(Math.random() * maxNumber + 1);

    if(numOfListElements == maxNumber) {
       drawnNumList = [];
    } 
    
    if(drawnNumList.includes(drawnNum)){
        return randNumGenerator();
    } else {
        drawnNumList.push(drawnNum);
        console.log(drawnNumList);
        return drawnNum;
    }
}

//  --- LIMPADOR DO CAMPO QUE DIGITA QUE EU ESQUECI O NOME --- 

let cleanInput = () => document.querySelector('input').value = '';

// --- COMPORTAMENTO DOS BOTÕES  --- 

//ATIVADOR DO BOTÃO NOVO JOGO
function htmlAttributeRemover(id, attributeName){
    button = document.getElementById(id);
    button.removeAttribute(attributeName);
}
//COMPORTAMENTO DO BOTÃO NOVO JOGO
function restart(){
    numSecreto = randNumGenerator();
    cleanInput();
    tryNum = 1;
    inicialMsg();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
//BOTÃO DE ATIVAÇÃO DO JOGO
//COMPARAÇÃO COM O NUMERO SECRETO EDIÇÃO DO HTML DE ACORDO COM O RESULTADO
function verificarChute(numSecreto){
    let chute = document.querySelector('input').value;

    if(chute == numSecreto){
        htmlTextEditor('h1', 'Acertou!');
        let tryWord = tryNum == 1 ? ' tentativa' : 'tentativas';
        let  tryMsg = `Você descobriu o numero secreto com ${tryNum} ${tryWord}!`
        htmlTextEditor('p', tryMsg);
        htmlAttributeRemover('reiniciar', 'disabled');

    } else {
        chute < numSecreto ? 
        htmlTextEditor('p', 'o numero secreto é mais alto!') : 
        htmlTextEditor('p', 'o numero secreto é mais baixo!');  
        tryNum++;
        cleanInput();
    }
}