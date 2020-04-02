let btnAddTarefa = document.querySelector("#adicionar-tarefa");
let tarefas = document.querySelector("#tarefas");
let inputTarefa = document.querySelector("#tarefa-digitada");
let listaTarefas = localStorage.getItem("listaTarefas") ? JSON.parse(localStorage.getItem("listaTarefas")) : [];

const salvarLocalStorage = tarefas => {
    let tarefasEmJson = JSON.stringify(tarefas)
    localStorage.setItem("listaTarefas", tarefasEmJson);
    console.log("Lista de tarefas salva com sucesso");
}

const mostrarNaTela = (arrayTarefas) => {
    arrayTarefas.forEach(textoTarefa => {
        let tarefaNova = `<div class="col-md-4 ">
        <div class="card-tarefa rounded">
            <div class="texto-tarefa">
                ${textoTarefa}
            </div>
            <div class="botao-tarefa">
                <img src="images/check.png" alt="Botão para finalizar tarefa" title="Botão para finalizar tarefa" width="32" />
            </div>
    </div>
    </div>`
        tarefas.insertAdjacentHTML('beforeend', tarefaNova);

        let objTarefaNova = tarefas.lastElementChild;
        let btnCheckTarefaNova = objTarefaNova.lastElementChild.lastElementChild
        btnCheckTarefaNova.onclick = (event) => {
            event.target.parentNode.parentNode.parentNode.remove();
            listaTarefas = listaTarefas.filter(valor => valor != textoTarefa);
            salvarLocalStorage(listaTarefas);
        }
    })
}

mostrarNaTela(listaTarefas);

const criarTarefaComEnter = (event) => {

    if (event.keyCode == 13 || event.type == "click") {
        let valorDigitado = inputTarefa.value;

        if (valorDigitado == "") {
            alert("Digite a tarefa primeiro!");
            return;
        }
        listaTarefas.push(valorDigitado);
        salvarLocalStorage(listaTarefas);

        let tarefaNova = `<div class="col-md-4 ">
    <div class="card-tarefa rounded">
        <div class="texto-tarefa">
            ${valorDigitado}
        </div>
        <div class="botao-tarefa">
            <img src="images/check.png" alt="Botão para finalizar tarefa" title="Botão para finalizar tarefa" width="32" />
        </div>
</div>
</div>`

        tarefas.insertAdjacentHTML('beforeend', tarefaNova);
        inputTarefa.value = "";

        let objTarefaNova = tarefas.lastElementChild;
        let btnCheckTarefaNova = objTarefaNova.lastElementChild.lastElementChild
        btnCheckTarefaNova.onclick = (event) => {
            event.target.parentNode.parentNode.parentNode.remove();
            listaTarefas = listaTarefas.filter(valor => valor != valorDigitado);
            salvarLocalStorage(listaTarefas);
        }
    }
}

inputTarefa.addEventListener('keypress', criarTarefaComEnter)
btnAddTarefa.addEventListener('click', criarTarefaComEnter)