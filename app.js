/*A idéia é fazer aqui uma tela de cadastro como as de sites convencionais
Fazendo todas as verificações nos campos
Ao final, mostrar todos os dados através de um alert, para ver se ta tudo certo
vamo que vamo!

COISAS PARA FAZER:
1 Estruturar o html com os campos
-Meu arquivo terá Data de Nascimento, CPF(Ver se tem como fazer validação), email, senha (fazendo verificação de caracteres, etc),
Cep (vai puxar o endereço através do cep - *função principal*), número da casa, Um botão de submit e um de limpar os campos
um checkbox de termos e condições

2 - Entender pq o label de validar o cpf fica habilitado de primeira-
3 - Fazer confirmação do email e da senha
4 - Resolver a API do CEP


*/
//Para fazer 25/04 - Fazer função de validar a senha

//Mudei o nome da função pois colocar a função com o mesmo nome do Id no HTML dá pau

function consultaCEP(){
    //Primeiro vamos pegar o valor que está no campo do CEP
    let cep = document.getElementById('CEP').value

    //Utilizaremos a API ViaCEP
    //Ela retorna uma url com um arquivo json contendo os dados da rua que vamos pesquisar
    //Só precisamos colocar o cep pesquisado no meio
    let url = 'https://viacep.com.br/ws/'+ cep + '/json/'

    //Com a url em mãos agora é só  usar a fetch API

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('street').value = data.logradouro
            document.getElementById('neighborhood').value = data.bairro
            document.getElementById('city').value = data.localidade
            document.getElementById('UF').value = data.uf
        })
        .catch(error => console.error(error))
}
function checkPassword(){
    let cPMessage = document.getElementById('cPMessage')
    let password = document.getElementById('password').value
    let confirmPassword = document.getElementById('confirmPassword').value

    if(password===confirmPassword){
        cPMessage.innerHTML = ''
    }else {
        cPMessage.innerHTML = 'As senhas não correspondem!'
        cPMessage.style.color = 'red'
    }
}


function validatePassword(){
    //Função feita bem nos cocos eu acho. Depois tem que ver se dá para melhorar
    let password = document.getElementById('password').value
    
    if(password.length>=8){
        document.getElementById('label8characters').style.color = 'green'
    }else{
        document.getElementById('label8characters').style.color = ''
    }
    if(/[A-Z]/.test(password)){
        document.getElementById('label1MajorLetter').style.color = 'green'
    }else{
        document.getElementById('label1MajorLetter').style.color = ''
    }

    if(/[0-9]/.test(password)){
        document.getElementById('label1Number').style.color = 'green'
    }else{
        document.getElementById('label1Number').style.color = ''
    }

    if(/[^a-zA-Z 0-9]+/g.test(password)){
        document.getElementById('label1Special').style.color = 'green'
    }else{
        document.getElementById('label1Special').style.color = ''
    }
}

function validarEmail(){
    let emailMessage = document.getElementById('checkEmailMessage')
    
    if (document.getElementById('email').checkValidity()===false){
        emailMessage.innerHTML = 'Digite um email válido!'
        emailMessage.style.color = 'red'
    }else {
        emailMessage.innerHTML = ''
    }
}

function validarCEmail(){
    let cEmailMessage = document.getElementById('checkEmailMessage')
    let cEmail = document.getElementById('validateEmail')
    let email = document.getElementById('email')

    if(cEmail.checkValidity()===false){
        cEmailMessage.innerHTML = 'Digite um email válido!'
        cEmailMessage.style.color = 'red'
    }else if(email.value === cEmail.value){
        cEmailMessage.innerHTML = ''
    }else {
        cEmailMessage.innerHTML = 'Os emails não correspondem!'
        cEmailMessage.style.color = 'red'
    }
}


//Validação do cpf

function validarCPF() {

    let cpf = document.getElementById("CPF").value
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
    
    const checkCPF = document.getElementById("checkCPF")

    // Verifica se tem 11 dígitos ou se é uma sequência inválida conhecida
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        checkCPF.innerText = "Insira um CPF Válido!"
        checkCPF.style.color = "red"
        return false;
    }

    // Validação do 1º dígito
    let soma = 0;
    let resto;
    for (let i = 1; i <= 9; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    // Validação do 2º dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    checkCPF.innerText = ""

    return true;
}
