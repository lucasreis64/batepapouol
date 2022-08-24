const nomeurl = 'https://mock-api.driven.com.br/api/v6/uol/participants';
const onlineurl = 'https://mock-api.driven.com.br/api/v6/uol/status';
const mensagemurl = 'https://mock-api.driven.com.br/api/v6/uol/messages';
const login = document.querySelector('.conteudo-login');
const papo = document.querySelector('.chat');
const enviada = document.querySelector('.enviada');
let promessa, usuario;

document.addEventListener('keydown', ola);

function ola(event) {
    if (event.keyCode === 13){
        pegarNome();
    }
}

function pegarNome() {
    document.removeEventListener('keydown', ola);
    userName();
    promessa.then(carregamento);
    promessa.catch(deuErro);
}

function deuErro() {
    alert('Nome já está em uso, tente novamente!');
    document.addEventListener('keydown', ola);
}



function carregamento(){
    const inferior = document.querySelector('.login');
    deletar(inferior);
    const carregar = document.createElement('img');
    const textoinferior = document.createElement('div');
    carregar.src='./assets/imagens/carregando.gif';
    textoinferior.innerHTML='Entrando...';
    inferior.appendChild(carregar);
    inferior.appendChild(textoinferior);
    setTimeout(chat, 3000);
    setInterval(carregarMensagens, 3000);
}

function chat() {
    setInterval(online, 5000);
    escondido = document.querySelectorAll('.escondido');
    escondido.forEach(mostrar);

    login.classList.add('escondido');
    document.body.classList.add('fundo');
    
}

function mostrar(item){
    item.classList.remove('escondido');
}

function userName() {
    let nome = document.querySelector('.nome');
    nome = nome.value;
    console.log(nome);
    usuario = {
        name: nome
    };
    console.log(usuario);
    promessa = axios.post(nomeurl, usuario);
}

function online() {
    const username = axios.post(onlineurl, usuario);
    username.then(situ);
}

function situ() {
    console.log('Status: Online');
}

function carregarMensagens() {
    const mensagens = axios.get(mensagemurl);
    mensagens.then(retorno);
}

function retorno(mensagem) {
    deletar(papo);
    console.log(papo)
    mensagem = mensagem.data;
    for (let cont = 0; cont < mensagem.length; cont++) {
        const msg = document.createElement('div');
        msg.classList.add('mensagem');
        if (mensagem[cont].type === 'message') {
            msg.innerHTML = `(${mensagem[cont].time}) <span>${mensagem[cont].from}</span> para <span>${mensagem[cont].to}</span>: ${mensagem[cont].text}`;
        }
        if (mensagem[cont].type === 'status') {
            msg.classList.add('cinza');
            msg.innerHTML = `(${mensagem[cont].time}) <span>${mensagem[cont].from}</span> ${mensagem[cont].text}`;
        }
        if (mensagem[cont].type === 'private_message') {
            msg.classList.add('rosa');
            msg.innerHTML = `(${mensagem[cont].time}) <span>${mensagem[cont].from}</span> reservadamente para <span>${mensagem[cont].to}</span>: ${mensagem[cont].text}`;
        }
        papo.appendChild(msg);
        if (cont===mensagem.length-1){
            msg.scrollIntoView();
        }
    }
}

function deletar(papo) {
    while (papo.firstChild) {
        papo.removeChild(papo.firstChild);
    }
}

function enviarMensagem(){
    
    const envio = {
        from: usuario.name,
        to: "Todos",
        text: enviada.value,
        type: "message"
    };
    console.log(envio);
    const enviar = axios.post(mensagemurl,envio);
    enviar.then(carregarMensagens);
    enviar.catch(atualizar);
    enviada.value='';
}
function atualizar(){
    alert('Você não está mais na sala! Aperte "ok" para entrar novamente.');
    window.location.reload();
}

enviada.addEventListener('keydown', enter);

function enter(event) {
    if (event.keyCode === 13){
        enviarMensagem();
    }
}
