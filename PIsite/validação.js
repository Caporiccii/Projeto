viacep.com.br / ws / 01001000 / json /
    function mascara(t, mask) {
        var i = t.value.length;
        var saida = mask.substring(1, 0);
        var texto = mask.substring(i)
        if (texto.substring(0, 1) != saida) {
            t.value += texto.substring(0, 1);
        }
    }

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
    document.getElementById('ibge').value = ("");
}

function meu_callback(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.getElementById('rua').value = (conteudo.logradouro);
        document.getElementById('bairro').value = (conteudo.bairro);
        document.getElementById('cidade').value = (conteudo.localidade);
        document.getElementById('uf').value = (conteudo.uf);
        document.getElementById('ibge').value = (conteudo.ibge);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}

function pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if (validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";
            document.getElementById('ibge').value = "...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'viacep.com.br/ws/01001000/json/' + cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};
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
    else if (conven.value == '') {
        alert('Insira Convênio para Cadastro')
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