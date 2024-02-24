// Define a chave utilizada para armazenar e recuperar os dados da lista no localStorage.
const localStorageKey = 'to-do-list-gn';

/* 
   Verifica se já existe uma tarefa com a mesma descrição na lista.
   Retorna true se a tarefa já existe e false se não existe.
*/
function validatedIfExistNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]"); // Obtém os dados da lista de tarefas armazenados no localStorage usando a chave localStorageKey | Utiliza JSON.parse para converter a string JSON armazenada no localStorage em um objeto JavaScript. | Se não houver dados (localStorage está vazio ou nulo), assume um array vazio [] como valor padrão.
    let inputValue = document.getElementById("input-new-task").value;
    let exists = values.find(x => x.name == inputValue); // Utiliza o método find para percorrer o array values e verificar se já existe uma tarefa com a mesma descrição (name) que foi digitada pelo usuário | Se encontrar uma tarefa com a mesma descrição, a variável exists receberá o objeto da tarefa encontrada. Caso contrário, será undefined.
    return exists ? true : false;
}

/* 
   Adiciona uma nova tarefa à lista se:
   - O campo de entrada (input-new-task) não estiver vazio.
   - Não houver uma tarefa com a mesma descrição já existente na lista.
   Caso contrário, exibe alertas indicando os problemas.
*/
function newTask() {
    let input = document.getElementById("input-new-task");
    input.style.border = '';

    // Validação
    if (!input.value) {
        input.style.border = '1px solid red';
        alert('Digite algo para inserir em sua lista');
    } else if (validatedIfExistNewTask()) {
        alert('Já existe uma task com essa descrição');
    } else {
        // Incrementa no localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
        values.push({
            name: input.value
        });
        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues();
    }

    input.value = '';
}

/*
   Exibe as tarefas na lista, incluindo um botão para remover cada tarefa.
   Utiliza um loop para percorrer o array de tarefas e gera o HTML correspondente.
*/


function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let list = document.getElementById('to-do-list');
    list.innerHTML = '';

    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<li>${values[i]['name']}
                            <button id='btn-edit' onclick='editItem("${values[i]['name']}")'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.293 2.293a1 1 0 0 1 1.414 0l1 1a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-1.414 0l-1-1a1 1 0 0 1 0-1.414l9-9zM14 6l-2-2 1-1 2 2-1 1zm-3.793 8.707a1 1 0 0 0-.126.127l-2 2a1 1 0 0 0 1.414 1.414l2-2a1 1 0 0 0-.288-1.41 1 1 0 0 0-1.414 0zM2 13h10v2H2z"/>
                                </svg>
                            </button>
                            <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16">
                                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                                </svg>
                            </button>
                        </li>`;
    }
}

/*
   Remove a tarefa especificada do array de tarefas e atualiza o localStorage.
   Chama a função showValues para atualizar a exibição da lista.
*/
function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    values.splice(index, 1);
    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues();
}

// Chama showValues() no final do script para exibir as tarefas iniciais ao carregar a página.
showValues();
