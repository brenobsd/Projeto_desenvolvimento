const url = "https://go-wash-api.onrender.com/api/auth/address";
async function mostrar_enderecos() {
    let api = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer" + JSON.parse(localStorage.getItem("user")).access_token,
        },
    });
    if (api.ok) {
        let resposta = await api.json();
        console.log(resposta);
    
        const divEnderecos = document.getElementById("enderecos");
        let listaEnderecos = resposta.data;
    
        listaEnderecos.forEach(endereco => {
            // Cria um parágrafo para o endereço
            let p = document.createElement("p2");
    
            // Cria os botões "Atualizar" e "Deletar"
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
    
            // Define o conteúdo do parágrafo
            p.textContent = `${endereco.id}|${endereco.title}|${endereco.cep}|${endereco.address}|${endereco.number}|${endereco.complement}`;
            p.style.display = 'flex';
            // Adiciona os botões ao parágrafo
            p.appendChild(btn_atualizar);
            p.appendChild(btn_deletar);
    
            // Adiciona o parágrafo à div de endereços
            divEnderecos.appendChild(p);
    
            // Adiciona eventos de clique aos botões
            btn_atualizar.addEventListener('click', function() {
                alert(`Atualizando o endereço: ${endereco.id}`);
            });
    
            btn_deletar.addEventListener('click', function() {
                alert(`Deletando o endereço: ${endereco.id}`);
            });
        });
    } else {
        console.log(`Erro: ${response.status}`);
        alert(`Erro: ${response.status}`);
    }
}
mostrar_enderecos();