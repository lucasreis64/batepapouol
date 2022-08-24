const nomeurl = 'https://mock-api.driven.com.br/api/v6/uol/participants';
const onlineurl = 'https://mock-api.driven.com.br/api/v6/uol/status'
const login = document.querySelector('.conteudo-login');
let promessa, usuario;
function pegarNome(){
    userName();
    promessa.then(chat);
    promessa.catch(deuErro);
}

function deuErro() {
    alert('Nome já está em uso, tente novamente!');
}

function chat(){
    setInterval(online, 5000);
    login.classList.add('escondido');
    
}

function userName(){
    let nome = document.querySelector('.nome');
    nome = nome.value;
    console.log(nome);
    usuario = {
        name: nome
    };
    console.log(usuario);
    promessa = axios.post(nomeurl, usuario);
}

function online () {
    const username = axios.post(onlineurl, usuario);
    username.then(situ);
}

function situ () {
    console.log('Status: Online');
}