const url ='https://go-wash-api.onrender.com/api/login';
async function login_usuario(){
  let email = document.querySelector("#email").value;
  let password = document.querySelector("#password").value;

  if(!email){
    alert("Preencha o campo de email")
    return;
  }
  if(!password){
    alert("Preencha o campo de senha")
    return;
  }

 let api = await fetch(url, {
    method:"POST",
    body: JSON.stringify({
    "email": email,
    "password": password,
    "user_type_id": "1",
    }),
      headers: {
        "Content-Type": "application/json",
      },
})


if (api.ok) {
    let resposta = await api.json();
    localStorage.setItem("user",JSON.stringify(resposta));
    alert("Login feito com sucesso");
    console.log("Login feito com sucesso");
    return
    } else{
    let respostaErro = await api.json();
       alert(respostaErro.data.errors)
    }
}

function cadastro_endereco(){
  let user = JSON.stringify(localStorage.getItem("user"));
  console.log(user);
}
cadastro_endereco();