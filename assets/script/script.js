const nomeurl = 'https://mock-api.driven.com.br/api/v6/uol/participants';
const onlineurl = 'https://mock-api.driven.com.br/api/v6/uol/status';
const mensagemurl = 'https://mock-api.driven.com.br/api/v6/uol/messages';
const login = document.querySelector('.conteudo-login');
const papo = document.querySelector('.chat');
const enviada = document.querySelector('.enviada');
let todos = document.querySelector('.usuarios>div');
const bottom = document.querySelector('.bottombar');
const inferior = document.querySelector('.login');
const lateral = document.querySelector('.barralateral');
const usuarios = document.querySelector('.usuarios');
const tipoenvio = document.querySelector('.tipoEnvio');
const privacidade = document.querySelector('.privacidade');
const container = document.querySelector('.container');
const nomebranco = "./assets/imagens/nomebranco.png";
const nomeusado = "./assets/imagens/nomeusado.png";
const proibidoespaco = "./assets/imagens/proibidoespaco.png";
const privadatodos = "./assets/imagens/privadatodos.png";
const mensagembranco = "./assets/imagens/mensagembranco.png";
const entrarnovamente = "./assets/imagens/entrarnovamente.png";

let ultimoselecionado;
let selecionado = '';
let teladecarregamento = 0;

let envio = {
    to: 'Todos',
    type: "message",
    from: '',
    text: ''
};
let promessa, usuario, entry = 0;
let msganterior = [];

document.addEventListener('keydown', ola);

function ola(event) {
    if (event.keyCode === 13) {
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
    const namer = usuario.name.trim();
    console.log(namer);

    if (namer === '') {
        aviso(nomebranco, inferior);
    } else {
        aviso(nomeusado, inferior);
    }
    document.addEventListener('keydown', ola);
}



function carregamento() {
    deletar(inferior);
    const carregar = document.createElement('img');
    const textoinferior = document.createElement('div');
    carregar.src = './assets/imagens/carregando.gif';
    textoinferior.innerHTML = 'Entrando...';
    carregar.classList.add('carregar');
    inferior.appendChild(carregar);
    inferior.appendChild(textoinferior);
    chat();
    setTimeout(chat, 3000);
    carregarMensagens();
    setInterval(carregarMensagens, 3000);
    //carregarMensagens();
}

function chat() {
    online();
    setInterval(online, 10000);
}

function mostrar(item) {
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
    if (usuario.name.charAt(0) === ' ' || usuario.name.charAt(usuario.name.length - 1) === ' ') {
        aviso(proibidoespaco, inferior);
    } else {
        promessa = axios.post(nomeurl, usuario);
    }
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
    mensagem = mensagem.data;
    console.log(mensagem);
    for (let cont = 0; cont < mensagem.length; cont++) {
/*         
        let hora=[],copia=[];
        hora[0]=mensagem[cont].time[0];
        hora[1]=mensagem[cont].time[1];
        console.log(hora);
        if(hora[0]==='0'){hora = parseInt(hora[1]);}
        else{hora = parseInt(hora);}
        console.log(hora);
        hora = hora - 3;
        console.log(hora);
        if (hora<0){
            hora+=12;
        }
        hora = hora.toString();
        console.log(hora);
        if(hora.length<2){hora='0'+hora;}
        console.log('length:',mensagem[cont].time.length);
        copia[0]=hora[0];
        copia[1]=hora[1];
        
        for(let cont1=2;cont1<mensagem[cont].time.length;cont1++){
            copia[cont1]=mensagem[cont].time[cont1];
        }   
        copia = copia.replace(",", ""); */

        const msg = document.createElement('div');
        msg.classList.add('mensagem');
        if (mensagem[cont].type === 'message') {
            msg.innerHTML = `<strong class = "horacinza">(${mensagem[cont].time})</strong> <strong>${mensagem[cont].from}</strong> para <strong class="margin0">${mensagem[cont].to}</strong>: ${mensagem[cont].text}`;
        }
        if (mensagem[cont].type === 'status') {
            msg.classList.add('cinza');
            msg.innerHTML = `<strong class = "horacinza">(${mensagem[cont].time})</strong> <strong>${mensagem[cont].from}</strong> ${mensagem[cont].text}`;
        }
        if (mensagem[cont].type === 'private_message') {
            msg.classList.add('rosa');
            msg.innerHTML = `<strong class = "horacinza">(${mensagem[cont].time})</strong> <strong>${mensagem[cont].from}</strong> reservadamente para <strong class="margin0">${mensagem[cont].to}</strong>: ${mensagem[cont].text}`;
        }
        if ((mensagem[cont].to === usuario.name || mensagem[cont].from === usuario.name) || mensagem[cont].to === 'Todos') {
            papo.appendChild(msg);
            if ((cont === mensagem.length - 1 && msganterior !== mensagem.data)) {
                msg.scrollIntoView();
            }
        }
    }
    msganterior = mensagem;
    if (teladecarregamento === 0) {
        escondido = document.querySelectorAll('.escondido');
        escondido.forEach(mostrar);
        document.body.classList.add('fundo');
        login.classList.add('escondido');
    }
    teladecarregamento++;
}

function deletar(papo) {
    while (papo.firstChild) {
        papo.removeChild(papo.firstChild);
    }
}

function enviarMensagem() {
    selecionado = document.querySelector(('.selecionado'));
    envio.from = usuario.name;
    envio.text = enviada.value;
    /*     if (selecionado !== null) {
            if (selecionado.classList.contains('publico') === true) {}
            if (selecionado.classList.contains('reservado') === true) {
            }
        } */
    console.log(envio);
    const teste = envio.text.trim();
    let enviar;
    const reservado = document.querySelector('.reservado');
    todos = document.querySelector('.todos');
    if (reservado.classList.contains('selecionado') && todos.classList.contains('selecionado')) {
        alert("Você não pode mandar uma mensagem privada para todos!");
    } else {
        enviar = axios.post(mensagemurl, envio);
        enviar.then(carregarMensagens);
    }
    if (teste !== '') {
        enviar.catch(atualizar);
    } else {
        enviar.catch(alertar);
    }
    enviada.value = '';
}

function atualizar() {
    alert('Você não está mais na sala! Aperte "ok" para entrar novamente.');
    window.location.reload();
}

function alertar() {
    aviso(mensagembranco, container);
}

enviada.addEventListener('keydown', enter);

function enter(event) {
    if (event.keyCode === 13) {
        enviarMensagem();
    }
}

function mostrarLateral() {
    usuariosOnline();
    setInterval(usuariosOnline, 5000);

    lateral.classList.remove('oculto');
}

function usuariosOnline() {
    const users = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    users.then(mostrarParticipantes);
    users.catch(deuErro);
}

function mostrarParticipantes(part) {
    part = part.data;
    console.log(part);
    deletar(usuarios);
    usuarios.appendChild(todos);
    todos.addEventListener('click', selecionarUsuario);
    for (let cont = 0; cont < part.length; cont++) {
        const divi = document.createElement('div');
        const icon = document.createElement('ion-icon');
        const divitexto = document.createElement('div');
        divitexto.innerHTML = part[cont].name;
        icon.setAttribute('name', 'person-circle');
        usuarios.appendChild(divi);
        divi.appendChild(icon);
        divi.appendChild(divitexto);
        divi.id = part[cont].name;
        divi.addEventListener('click', selecionarUsuario);
        if (ultimoselecionado === divi.id) {
            selecionarUsuarioClone(divi);
        }
    }
}

function selecionarUsuario() {
    const selecionadousuario = usuarios.querySelectorAll(('.selecionado'));
    selecionadousuario.forEach(removerCheck);
    this.classList.add('selecionado');
    const icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'checkmark');
    icon.classList.add('verde', 'check');
    this.appendChild(icon);
    envio.to = this.id;
    const reservado = document.querySelector('.reservado');
    if (reservado.classList.contains('selecionado') === true) {
        console.log('oi')
        tipoenvio.innerHTML = `Enviando para ${envio.to} (reservadamente)`;
    }
    ultimoselecionado = this.id;
}

function selecionarUsuarioClone(esse) {
    const selecionadousuario = usuarios.querySelectorAll(('.selecionado'));
    selecionadousuario.forEach(removerCheck);
    esse.classList.add('selecionado');
    const icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'checkmark');
    icon.classList.add('verde', 'check');
    esse.appendChild(icon);
    envio.to = esse.id;
    const reservado = document.querySelector('.reservado');
    if (reservado.classList.contains('selecionado') === true) {
        console.log('oi')
        tipoenvio.innerHTML = `Enviando para ${envio.to} (reservadamente)`;
    }
    ultimoselecionado = esse.id;
}


function fecharLateral() {
    lateral.classList.add('oculto');
}

function selecionarVisibilidade(esse) {
    const selecionadoprivado = privacidade.querySelectorAll(('.selecionado'));
    selecionadoprivado.forEach(removerCheck);
    esse.classList.add('selecionado');
    const icon = document.createElement('ion-icon');
    icon.setAttribute('name', 'checkmark');
    icon.classList.add('verde', 'check');
    esse.appendChild(icon);
    if (esse.classList.contains('reservado') === true) {
        tipoenvio.innerHTML = `Enviando para ${envio.to} (reservadamente)`;
        envio.type = 'private_message';
    }
    if (esse.classList.contains('publico') === true) {
        tipoenvio.innerHTML = ``;
        envio.type = 'message';
    }
}

function removerCheck(este) {
    const check = este.querySelector('.check');
    console.log(este);
    este.classList.remove('selecionado');
    este.removeChild(check);
}

function aviso(source, inferior) {
    const img = document.createElement('img');
    img.src = source;
    inferior.appendChild(img);
    img.classList.add('avisoescondido');
    console.log(img);
    setTimeout(() => {
        img.classList.add('avisoaparecido');
    }, 200);
    setTimeout(() => {
        img.classList.remove('avisoaparecido');
    }, 2000);

}
