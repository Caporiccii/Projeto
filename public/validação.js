verificarAutenticacao();

function verificarAutenticacao() {
    if (sessionStorage.usuario_bandtec != undefined && sessionStorage.senha_bandtec != undefined) {
        window.location.href = 'https://www.gruposulamericasaude.com.br/site/';
    }
}

function entrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_login));
    fetch("/usuarios/entrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {
        
        if (response.ok) {

            response.json().then(function (resposta) {

                sessionStorage.usuario_bandtec = resposta.nome;
                sessionStorage.senha_bandtec = resposta.Senha;
                verificarAutenticacao();

            });
        } else {

            console.log('Erro de login!');
            finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    btn_entrar.disabled = true;
    img_aguarde.style.display='block';
    div_erro.style.display='none';
}

function finalizar_aguardar() {
    btn_entrar.disabled = false;
    img_aguarde.style.display='none';
    div_erro.style.display='block';
}
function cadastrar() {
    aguardar();
    var formulario = new URLSearchParams(new FormData(form_cadastro));
    fetch("/usuarios/cadastrar", {
        method: "POST",
        body: formulario
    }).then(function (response) {

        if (response.ok) {
            window.location.href = 'https://www.gruposulamericasaude.com.br/site/';
        } else {

            console.log('Erro de cadastro!');
            response.text().then(function (resposta) {
                div_erro.innerHTML = resposta; 
                });

                  finalizar_aguardar();
        }
    });

    return false;
}

function aguardar() {
    btn_entrar.disabled = true;
    // img_aguarde.style.display = 'block';
    // div_erro.style.display = 'none';
}

function finalizar_aguardar() {
    btn_entrar.disabled = false;
    // img_aguarde.style.display = 'none';
    // div_erro.style.display = 'block';
}
function log() {
    if (nome.value == '') {
        alert('Campo nome vazio');
    }
    else if (Senha.value == '') {
        alert('Campo senha vazio');
    }
}
function verifica() {
    if (nomecad.value =='') {
        alert('Insira Nome para Cadastro')
    }
    else if (sobre.value == '') {
        alert('Insira Sobrenome para Cadastro')
    }
    else if (cpf.value == '') {
        alert('Insira CPF para Cadastro')
    }
    else if (rg.value == 0) {
        alert('Insira RG para Cadastro')
    }
   
    else if (email.value == '') {
        alert('Insira E-mail para Cadastro')
    }
    else if (confe.value == '') {
        alert('Cofirme E-mail para Cadastro')
    }
    else if (confe.value != email.value) {
        alert('E-mail mão identicos')
    }
    
    else if(senhacad.value == ''){
        alert('Insira senha para Cadastro')
    }
    else if(confcadsenha.value == ''){
        alert('Confirme senha para Cadastro')
    }
    else if(senhacad.value != confcadsenha.value){
        alert('Senhas Não Coincidemx')
    }
    else if(cep.value ==''){
        alert('Cep em Branco')
    }
    else if(rg.value ==''){
        alert('RG em Branco')
    }
}
function mascara(t, mask) {
    var i = t.value.length;
    var saida = mask.substring(1, 0);
    var texto = mask.substring(i)
    if (texto.substring(0, 1) != saida) {
        t.value += texto.substring(0, 1);
    }
}