const url = "https://go-wash-api.onrender.com/api/auth";

async function mostrar_enderecos() {
    let api = await fetch(url + "/address", {
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

            btn_atualizar.addEventListener('click', function () {
                window.location.href = "../view/atualizar_endereco.html"
                atualizarEndereco(endereco.id);
            });

            btn_deletar.addEventListener('click', function () {
                deletarEndereco(endereco.id);
            });
        });
    } else {
        console.log(`Erro: ${api.status}`);
        alert(`Erro: ${api.status}`);
    }
}

async function deletarEndereco(id) {
    let confirmacao = confirm("Você realmente deseja deletar este endereço?");
    if (confirmacao) {
        let response = await fetch(`${url + "/address"}/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
            },
        });

        if (response.ok) {
            alert("Endereço deletado com sucesso!");
            mostrar_enderecos();
            window.location.reload()
        } else {
            console.log(`Erro ao deletar: ${response.status}`);
            alert(`Erro ao deletar: ${response.status}`);
        }
    }
}
async function logout() {
    let confirmacao = confirm("Você realmente deseja fazer logout?");
    if (confirmacao) {
        let resposta = await fetch(url + "/logout", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).access_token,
            },
        });
        if (resposta.ok) {
            localStorage.removeItem("user");
            window.location.href = "../view/login.html";
            alert("Logout feito com sucesso");
            console.log("Logout feito com sucesso")
        } else {
            console.log(`Erro ao fazer Logout: ${response.status}`);
            alert(`Erro ao fazer Logout: ${response.status}`);
        }
    }
}
mostrar_enderecos();