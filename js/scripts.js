// Seleção de elementos
let tarefas = [];
let tarefaId = 0;


const todoInput = document.getElementById('todo-input');
const todoEdit = document.getElementById('todo-edit');
const todoFiltros = document.getElementById('todo-filtros');
const todoList = document.getElementById('todo-list');

const inputTitulo = document.querySelector('#todo-input .form-control');
const btnAdicionar = document.getElementById('button-addon2');

const inputTituloEdit = document.getElementById('titulo');
const inputDataTarefaEdit = document.getElementById('dataTarefa');
const inputComentarioEdit = document.getElementById('comentario');
const inputPrioridadeEdit = document.getElementById('prioridade');
const inputNotificacaoEdit = document.getElementById('notificacao');
const inputDataCriacaoEdit = document.getElementById('dataCriacao');

const btnSalvar = document.querySelector('#todo-edit .btn-primary');
const btnCancelar = document.querySelector('#todo-edit .btn-secondary');
const btnLixo = document.querySelector('#todo-edit .btn-info');

// Funções 
function addTarefa(tituloTarefa) {
    const lista = document.querySelector('#todo-list .list-group');
    const id = tarefaId++;
    const dataTarefa = new Date().toLocaleDateString();
    const descricaoTarefa = "Descrição.";
    const prioridadeTarefa = "Prioridade.";
    const dataCriacao = new Date().toLocaleDateString();
    const notificacao = "NÃO";

    const tarefaObj = {
        id,
        titulo: tituloTarefa,
        dataTarefa,
        descricao: descricaoTarefa,
        prioridade: prioridadeTarefa,
        dataCriacao,
        notificacao
    };

    tarefas.push(tarefaObj);
    renderizarTarefas();
}

function renderizarTarefas(listaTarefas = tarefas) {
    const lista = document.querySelector('#todo-list .list-group');
    lista.innerHTML = '';

    if (tarefas.length === 0) {
        lista.innerHTML = '<div class="text-center text-muted py-3 agenda-vazia">Agenda vazia <i class="bi bi-emoji-sunglasses"></i><br />Não há tarefas cadastradas!</div>';
        return;
    }

    listaTarefas.forEach(tarefa => {
        const item = document.createElement('a');
        item.href = "#";
        item.className = 'list-group-item list-group-item-action';
        item.setAttribute('id-unico', tarefa.id);

        item.innerHTML = `
                <div class="d-flex w-100 justify-content-between">
                    <div class="d-flex align-items-center">
                        <h5 class="mb-1 me-3">${tarefa.titulo}</h5>
                        <small class="text-muted">${tarefa.dataTarefa}</small>
                    </div>
                    <div class="d-flex align-items-center gap-1">
                        <button class="btn btn-outline-secondary btn-sm btn-info" type="button">
                            <i class="bi bi-info-lg"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm btn-edit" type="button">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-outline-secondary btn-sm btn-remove" type="button">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                </div>
                <p class="mb-1">${tarefa.descricao}</p>
                <small class="text-start d-block">${tarefa.prioridade}</small>
                <div class="detalhes-tarefa mt-2 collapse-anim">
        <hr>
        <div id="data-de-criacao">Data de criação: <strong>${tarefa.dataCriacao}</strong></div>
        <div id="notificacao">Notificação: <strong>${tarefa.notificacao}</strong></div>
    </div>
            `;
        lista.appendChild(item);
    });
}

function formatarDataParaInput(dataBR) {
    // dataBR: 'dd/mm/aaaa'
    const [dia, mes, ano] = dataBR.split('/');
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
}

function dataBRparaDate(dataStr) {
    if (!dataStr) return new Date(0);
    if (dataStr.includes('-')) return new Date(dataStr);
    const [dia, mes, ano] = dataStr.split('/');
    return new Date(`${ano}-${mes}-${dia}`);
}

function formatarDataParaBR(dataISO) {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
}

function ordenarPorDataCriacao(tarefas) {
    return tarefas.slice().sort((a, b) => dataBRparaDate(a.dataCriacao) - dataBRparaDate(b.dataCriacao));
}

function ordenarPorDataTarefa(tarefas) {
    return tarefas.slice().sort((a, b) => dataBRparaDate(a.dataTarefa) - dataBRparaDate(b.dataTarefa));
}

function ordenarPorPrioridade(tarefas) {
    const ordem = { 'ALTA': 1, 'MÉDIA': 2, 'BAIXA': 3 };
    return tarefas.slice().sort((a, b) => ordem[a.prioridade] - ordem[b.prioridade]);
}

function ordenarPorTitulo(tarefas) {
    return tarefas.slice().sort((a, b) => a.titulo.localeCompare(b.titulo));
}

// Eventos
btnAdicionar.addEventListener('click', function (e) {
    e.preventDefault();

    const tituloTarefa = inputTitulo.value.trim();

    /**
     * Usar Alerts do Bootstrap futuramente.
     */
    if (!tituloTarefa) {
        alert("Título da tarefa em branco!!");
        return;
    }

    addTarefa(tituloTarefa);
    inputTitulo.value = "";
    console.log("Tarefa Adicionada:", tituloTarefa);
});

btnSalvar.addEventListener('click', function(e) {
    e.preventDefault();


    const id = Number(todoEdit.getAttribute('data-editando-id'));
    const tarefa = tarefas.find(t => t.id === id);

    tarefa.titulo = inputTituloEdit.value;
    tarefa.dataTarefa = formatarDataParaBR(inputDataTarefaEdit.value);
    tarefa.descricao = inputComentarioEdit.value;
    tarefa.prioridade = inputPrioridadeEdit.value;
    tarefa.notificacao = inputNotificacaoEdit.value;

    renderizarTarefas();

    todoEdit.style.display = 'none';
    todoInput.style.display = 'block';
    todoFiltros.style.display = 'flex';
    todoList.style.display = 'block';
});

btnCancelar.addEventListener('click', function(e) {
    e.preventDefault();
    todoEdit.style.display = 'none';
    todoInput.style.display = 'block';
    todoFiltros.style.display = 'flex';
    todoList.style.display = 'block';
});

btnLixo.addEventListener('click', function(e) {
    e.preventDefault();
    inputTituloEdit.value = '';
    inputDataTarefaEdit.value = '';
    inputComentarioEdit.value = '';
    inputPrioridadeEdit.value = '';
    inputNotificacaoEdit.value = '';
});

const lista = document.querySelector('#todo-list .list-group');

lista.addEventListener('click', function (e) {
    if (e.target.closest('.btn-remove')) {
        const tarefaElemento = e.target.closest('.list-group-item');
        const id = Number(tarefaElemento.getAttribute('id-unico'));
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        renderizarTarefas();
    }

    if (e.target.closest('.btn-info')) {
        const tarefaElemento = e.target.closest('.list-group-item');
        const detalhes = tarefaElemento.querySelector('.detalhes-tarefa');
        detalhes.classList.toggle('expandido');
    }

    if (e.target.closest('.btn-edit')) {
        const tarefaElemento = e.target.closest('.list-group-item');
        const id = Number(tarefaElemento.getAttribute('id-unico'));
        const tarefa = tarefas.find(t => t.id === id);

        todoInput.style.display = 'none';
        todoFiltros.style.display = 'none';
        todoList.style.display = 'none';
        todoEdit.style.display = 'block';

        inputTituloEdit.value = tarefa.titulo;
        inputDataTarefaEdit.value = formatarDataParaInput(tarefa.dataTarefa); 
        inputComentarioEdit.value = tarefa.descricao;
        inputPrioridadeEdit.value = tarefa.prioridade;
        inputNotificacaoEdit.value = tarefa.notificacao;
        inputDataCriacaoEdit.value = tarefa.dataCriacao;

        todoEdit.setAttribute('data-editando-id', id);
    }
});

document.getElementById('btnradio1').addEventListener('change', function() {
    renderizarTarefas(tarefas); 
});
document.getElementById('btnradio2').addEventListener('change', function() {
    renderizarTarefas(ordenarPorDataCriacao(tarefas));
});
document.getElementById('btnradio3').addEventListener('change', function() {
    renderizarTarefas(ordenarPorDataTarefa(tarefas));
});
document.getElementById('btnradio4').addEventListener('change', function() {
    renderizarTarefas(ordenarPorPrioridade(tarefas));
});
document.getElementById('btnradio5').addEventListener('change', function() {
    renderizarTarefas(ordenarPorTitulo(tarefas));
});