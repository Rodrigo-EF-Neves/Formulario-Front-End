const handlePhone = (event) => {
    let input = event.target;
    input.value = mascaraTelefone(input.value);
}

const mascaraTelefone = (value) => {
    if (!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{2})(\d)/, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    return value;
}

document.addEventListener("DOMContentLoaded", function () {
    const dataNascInput = document.getElementById("id_datanasc");
    dataNascInput.addEventListener("blur", validaDataNascimento);
});

function validaDataNascimento() {
    const dataNascInput = document.getElementById("id_datanasc");
    const dataNascimento = new Date(dataNascInput.value);
    const hoje = new Date();
    const idade = Math.floor((hoje - dataNascimento) / (365.25 * 24 * 60 * 60 * 1000));
    if(idade < 18) { 
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'Você deve ter ao menos 18 anos para se cadastrar.',
            })
            dataNascInput.value = ""; 
            dataNascInput.focus();
    }
}

const handleCpf = (event) => {
    let input = event.target;
    input.value = mascaraCpf(input.value);
}

const mascaraCpf = (value) => {
    if(!value) return "";
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    return value;
}

function preencheEndereco() {
    const cepInput = document.getElementById('id_cep');
    const cep = cepInput.value.replace(/\D/g, ''); 
  
    if (cep.length !== 8) return; 
  
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        document.getElementById('id_cidade').value = data.localidade;
        document.getElementById('id_estado').value = data.uf;
        document.getElementById('id_logradouro').value = data.logradouro;
        document.getElementById('id_bairro').value = data.bairro;
        document.getElementById('id_complemento').value = data.complemento;
        document.getElementById('id_cidade').readonly = true;
        document.getElementById('id_estado').readonly = true;
        document.getElementById('id_logradouro').readonly = true;
        document.getElementById('id_bairro').readonly = true;
        document.getElementById('id_complemento').readonly = true;
      })
      .catch(error => console.error(error));
  }

  function validaTamanhoSenha() {
    const senha = document.getElementById("id_senha").value;
    if(senha.length < 6) {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A senha deve conter pelo menos 6 caracteres!',
          })
          return;
    }
  }

  function validaSenhasIguais() {
    const senha = document.getElementById("id_senha").value;
    const repsenha = document.getElementById("id_repsenha").value;
    if (repsenha.length >= 6) {
        if(senha !== repsenha) {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'As senhas devem ser iguais!',
              })
              return;
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Erro',
            text: 'A senha deve conter pelo menos 6 caracteres!',
          })
          return;
    }
  }