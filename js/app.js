let nomes = [];
let nomeAmigo = document.getElementById('nome-amigo');

function adicionar(){
	let listaAmigos = document.getElementById('lista-amigos');
	
	//incluir nomes.
	  incluirNomes();

	//Exibir nomes.
	listaAmigos.textContent = nomes;

	//Limpar campo.
	nomeAmigo.value = '';
}

function sortear(){
	let resultado = [];
	let listaSorteados = document.getElementById('lista-sorteio');
	
	if (nomes.length <= 2){
	alert('Favor preencher ao menos 3 nomes.');
	return;
	} else {
	resultado = sortearAmigoSecreto(nomes);
	}
	listaSorteados.innerHTML = resultado.map(par => `${par.nome} tirou ${par.amigoSecreto}`).join('<br>');
}

function reiniciar(){
	document.getElementById('nome-amigo').value = '';
	document.getElementById('lista-amigos').textContent = '';
	nomes = [];
	resultado = [];
	document.getElementById('lista-sorteio').textContent = '';
}

function incluirNomes(){
	let nomesMinusculas = nomes.map(item => item.toLowerCase());
	if (nomesMinusculas.includes(nomeAmigo.value.toLowerCase())){
		alert('Nome já Incluído na lista');
		return;
	} else if(nomeAmigo.value === ''){
	 	alert('Preencher nome!');
		return;
	}else{
		nomes.push(nomeAmigo.value);	
	}
}

function embaralharArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortearAmigoSecreto(nomes) {
  let sorteio = [...nomes];
  let tentativas = 0;
  let sucesso = false;

  while (!sucesso && tentativas < 100) {
    sorteio = embaralharArray([...nomes]);
    sucesso = !nomes.some((nome, index) => nome === sorteio[index]);
    tentativas++;
  }

  if (!sucesso) {
    throw new Error("Não foi possível realizar o sorteio sem repetições.");
  }

  return nomes.map((nome, index) => ({ nome, amigoSecreto: sorteio[index] }));
}