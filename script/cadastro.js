const url = "https://go-wash-api.onrender.com/api/user";
async function cadastro_usuario() {
  let name = document.querySelector("#name").value;
  let email = document.querySelector("#email").value;
  let cpf = document.querySelector("#cpf-cnpj").value;
  let senha = document.querySelector("#password").value;
  let data = document.querySelector("#date").value;
  let termos = document.querySelector("#terms").checked;
   
  
  let api = await fetch(url, {
    method: "POST",
    body: JSON.stringify({
      "name": name,
      "email": email,
      "user_type_id": 1,
      "password": senha,
      "cpf_cnpj": cpf,
      "terms": termos,
      "birthday": data,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

    if (api.ok) {
      let resp = await api.json();
      alert(resp.data);
      console.log(resp.data);
    } else {
      let respErro = await api.json();
      if (respErro?.data?.errors?.cpf_cnpj?.[0]) {
        alert(`ERRO, ${respErro.data.errors.cpf_cnpj[0]}`);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
      console.log(respErro);
    }
  }

