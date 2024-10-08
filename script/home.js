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
        console.log(resposta)
    } else {
        console.log(`Erro: ${response.status}`);
    }
}
mostrar_enderecos();