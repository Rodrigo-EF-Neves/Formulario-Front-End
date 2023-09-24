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

const inputCep = document.getElementById('id_cep');
inputCep.addEventListener('input', () => {
    const cep = input.cep.value.replace(/\D/g, '');
    if(cep.length === 8) {
        const url = `https://viacep.com.br/ws/${cep}/json/`;
        fetch(url)
            .then(response => response.json)
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
            .catch(error => {
                console.log('Erro');
                console.log(error);
            });
    }
});