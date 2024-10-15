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
            const p = document.createElement("p2");
            p.textContent = `${endereco.title}, ${endereco.cep}, ${endereco.address}, ${endereco.number} - ${endereco.complement}`;
            divEnderecos.appendChild(p);
        });
    } else {
        console.log(`Erro: ${response.status}`);
        alert(`Erro: ${response.status}`);
    }
}
mostrar_enderecos();