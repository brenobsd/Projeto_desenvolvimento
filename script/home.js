const url = "https://go-wash-api.onrender.com/api/auth/address";

async function mostrar_enderecos() {
    let api = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
        },
    });
    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta);

        const divEnderecos = document.getElementById("enderecos");
        let listaEnderecos = resposta.data;

        listaEnderecos.forEach(endereco => {
            let p = document.createElement("p");
            let btn_atualizar = document.createElement("input");
            btn_atualizar.type = 'button';
            btn_atualizar.value = 'Atualizar';
            btn_atualizar.id = 'btn-atualizar';
            btn_atualizar.style.cursor = 'pointer';

            let btn_deletar = document.createElement("input");
            btn_deletar.type = 'button';
            btn_deletar.value = 'Deletar';
            btn_deletar.id = 'btn-deletar';
            btn_deletar.style.cursor = 'pointer';

            p.textContent = `${endereco.id}|${endereco.title}|${endereco.cep}|${endereco.address}|${endereco.number}|${endereco.complement}`;
            p.style.display = 'flex';
            p.appendChild(btn_atualizar);
            p.appendChild(btn_deletar);
            divEnderecos.appendChild(p);

            btn_atualizar.addEventListener('click', function() {
                atualizarEndereco(endereco.id);
            });

            btn_deletar.addEventListener('click', function() {
                deletarEndereco(endereco.id);
            });
        });
    } else {
        console.log(`Erro: ${api.status}`);
        alert(`Erro: ${api.status}`);
    }
}

async function atualizarEndereco(id) {
    let novoTitulo = prompt("Digite o novo título:");
    let novoCep = prompt("Digite o novo CEP:");
    let novoEndereco = prompt("Digite o novo endereço:");
    let novoNumero = prompt("Digite o novo número:");
    let novoComplemento = prompt("Digite o novo complemento:");

    let data = {
        title: novoTitulo,
        cep: novoCep,
        address: novoEndereco,
        number: novoNumero,
        complement: novoComplemento
    };


    let response = await fetch(`${url}/${id}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert("Endereço atualizado com sucesso!");
        window.location.reload();
    } else {
        console.log(`Erro ao atualizar: ${response.status}`);
        alert(`Erro ao atualizar: ${response.status}`);
    }
}

async function deletarEndereco(id) {
    let confirmacao = confirm("Você realmente deseja deletar este endereço?");
    if (confirmacao) {
        let response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
            },
        });

        if (response.ok) {
            alert("Endereço deletado com sucesso!");
            mostrar_enderecos(); 
        } else {
            console.log(`Erro ao deletar: ${response.status}`);
            alert(`Erro ao deletar: ${response.status}`);
        }
    }
}

mostrar_enderecos();