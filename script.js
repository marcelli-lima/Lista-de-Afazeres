var btnAdicionar = document.getElementById("btnAdd")
var adicionarItem = document.getElementById("adicionarItem");
var lista = document.querySelector("#lista");
var item = document.getElementsByTagName("li");
console.log(item);
var ItensDaLista = [];
carregarLista();

function inputTamanho() {
    return adicionarItem.value.length;
}

function deleteItem(valor) { //passo como parametro o texto digitado. esse texto vai ser o ID ou identificador do elemento id="`+valor+`"  na lista.
    if (confirm("Tem certeza que deseja excluir?")) {
        let deletarItem = document.getElementById(valor);
        deletarItem.parentNode.removeChild(deletarItem);


        let itensDaListaTemp = [];                      //array temporario para receber o novo array
        for (let i = 0; i < ItensDaLista.length; i++) {      //faço a leitura de todos os itens do array atual
            if (valor != ItensDaLista[i]) {               //uso o IF para localizar o valor que o usuário está querendo deletar. Qualquer valor diferente vai ser add no itensDaListaTemp -é um array temporário
                itensDaListaTemp.push(ItensDaLista[i]); //add no array temporário (itensDaListaTemp) todos os elementos que sobraram 
            }
        }
        ItensDaLista = itensDaListaTemp;                //atualizo o array atual com as novas modificações (modificacoes = deletei um elemento)
        salvarLocalStore()                              //salvo as modificacoes
    }
}

btnAdicionar.addEventListener("click", addLista);
adicionarItem.addEventListener("keypress", addListaKeypress);

function addListaKeypress() {
    if (inputTamanho() > 0 && event.which === 13) {
        criarElemento(adicionarItem.value);
    }
}

function addLista() {
    if (inputTamanho() > 0) {
        criarElemento(adicionarItem.value);
        salvarLocalStore();
    } else {
        alert("Favor inserir um item");
    }
}

function salvarLocalStore() {
    localStorage.setItem("lista", JSON.stringify(ItensDaLista));
}

function carregarLista() {
    if (localStorage.lista) {
        var listaLocalStorage = localStorage.getItem("lista");
        listaLocalStorage = JSON.parse(listaLocalStorage);
        for (var i = 0; i < listaLocalStorage.length; i++) {
            criarElemento(listaLocalStorage[i]);
        }
    }
}

function criarElemento(valor) {
    //pega o valor do input
    //ao clicar em adicionar o valor será enviado para a lista
    lista.innerHTML +=
        `<li class='list-group-item' id="` + valor + `">
            <div class="form-check">
                <label class="form-check-label">
                    <input class="form-check-input" class="checkbox" type="checkbox" onclick='marcarElemento("` + valor + `")'>
                    
                        ` + valor + `
                </label>
                <button class="btn" onclick='deleteItem("` + valor + `")'>X</button>
             </div>
        </li>`;

    ItensDaLista.push(valor);
    document.getElementById("adicionarItem").value = "";
    adicionarItem.focus();
    salvarLocalStore();
}

function marcarElemento(valor) {
    if (document.getElementById(valor).style.textDecoration == '' || document.getElementById(valor).style.textDecoration == 'none') { //Verifico se o estado atual é vazio ou 'none'
        document.getElementById(valor).style.setProperty("text-decoration", "line-through");                                        //se for vazio ou 'none' entao eu rasuro o texto
    } else {
        document.getElementById(valor).style.setProperty("text-decoration", "none");                                                //se o texto tiver rasurado então eu removo a rasura
    }
}
