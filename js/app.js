let nomes = [];
let nomeAmigo = document.getElementById('nome-amigo');
document.querySelector('.friends__title').textContent = 'Amigos incluídos (Clique no nome para excluir)';

function adicionar(){
	let listaAmigos = document.getElementById('lista-amigos');
	
	//incluir nomes.
	incluirNomes();

	//Exibir nomes.
	atualizarLista();

	//Limpar campo.
	nomeAmigo.value = '';
	document.getElementById('lista-sorteio').innerHTML = '';
}

function sortear(){
	let resultado = [];
	let listaSorteados = document.getElementById('lista-sorteio');
	
	if (nomes.length < 4){ // Verifica mínimo de 4 participantes.
	alert('Favor preencher ao menos 4 nomes.');
	return;
	} else {
	resultado = sortearAmigoSecreto(nomes);
	}
	listaSorteados.innerHTML = resultado.join('<br>');
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
	if (nomesMinusculas.includes(nomeAmigo.value.toLowerCase())){ //Verificar nomes iguais sem maiusculas.
		alert('Nome já Incluído na lista');
		return;
	} else if(nomeAmigo.value === ''){ // Verificar preenchimento do campo Amigo.
	 	alert('Preencher nome!');
		return;
	}else{
		nomes.push(nomeAmigo.value);	
	}
}

function embaralhar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function sortearAmigoSecreto(lista) {
	let sorteio = embaralhar(lista);
	let resultado = [];
	for (let i = 0; i < sorteio.length; i++ ){
		if(i == sorteio.length - 1){
		  resultado.push(`${sorteio[i]} tirou ${sorteio[0]}`);
		} else {
		  resultado.push(`${sorteio[i]} tirou ${sorteio[i + 1]}`);
		}
	}
	return resultado;
}

function atualizarLista() {
    let listaAmigos = document.getElementById('lista-amigos');
    listaAmigos.innerHTML = '';
    nomes.forEach((nome, index) => {
        let amigoElement = document.createElement('span');
        if (listaAmigos.textContent == ''){
	  amigoElement.textContent = nome;
	} else{
	  amigoElement.textContent = ', ' + nome;
	}
        amigoElement.classList.add('amigo-clicavel');
        amigoElement.onclick = () => removerAmigo(index);
        listaAmigos.appendChild(amigoElement);
    });
}

function removerAmigo(index) {
    nomes.splice(index, 1);
    atualizarLista();
    document.getElementById('lista-sorteio').innerHTML = '';
}
