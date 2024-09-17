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
      let resposta = await api.json();
      alert(resposta.data);
      console.log(resposta.data);
      return
    } else {
      let respostaErro = await api.json();
      if (respostaErro?.data?.errors?.email?.[0]) {
        alert(`ERRO, ${respostaErro.data.errors.email[0]}`);
        } 
      if (respostaErro?.data?.errors?.cpf_cnpj?.[0]) {
      alert(`ERRO, ${respostaErro.data.errors.cpf_cnpj[0]}`);
      } 
      if (respostaErro?.data?.errors?.password?.[0]){
      alert(`ERRO, ${respostaErro.data.errors.password[0]}`)
      }
       console.log(respostaErro);
  }

}
