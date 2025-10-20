const kanbanContainer = document.getElementById('kanbanContainer');
const kanbanTitle = document.getElementById('kanbanTitle');
const backBtn = document.getElementById('backBtn');
const projectSelection = document.getElementById('projectSelection');

let kanbans = JSON.parse(localStorage.getItem('kanbans')) || [];
let currentIndex = localStorage.getItem('currentKanban');

// 🔹 Função: mostra lista de projetos para escolher
function showProjectSelection() {
  kanbanContainer.style.display = 'none';
  kanbanTitle.style.display = 'none';
  backBtn.style.display = 'none';

  projectSelection.innerHTML = `
    <h2>Quadros de Projetos</h2>
    <div class="project-list">
      ${kanbans.map((k, i) => `
        <button class="project-btn" data-index="${i}">
          ${k.name}
        </button>
      `).join('')}
    </div>
  `;

  document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const index = btn.getAttribute('data-index');
      localStorage.setItem('currentKanban', index);
      location.reload();
    });
  });
}

// 🔹 Função: mostra o quadro Kanban do projeto selecionado
function showKanban() {
  projectSelection.style.display = 'none';
  kanbanContainer.style.display = 'flex';
  kanbanTitle.style.display = 'block';
  backBtn.style.display = 'inline-block';

  let currentKanban = kanbans[currentIndex];
  if (!currentKanban) {
    showProjectSelection();
    return;
  }

  kanbanTitle.textContent = currentKanban.name;

  function createColumn(name) {
    const column = document.createElement('div');
    column.classList.add('column');
    column.innerHTML = `
        <h2>${name}</h2>
        <div class="task-list" id="${name}"></div>
        <button onclick="addTask('${name}')">+ Adicionar tarefa</button>
    `;
    kanbanContainer.appendChild(column);
  }

  function renderTasks() {
    Object.keys(currentKanban.tasks).forEach(column => {
      const taskList = document.getElementById(column);
      taskList.innerHTML = '';
      currentKanban.tasks[column].forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        taskDiv.setAttribute('draggable', 'true');
        taskDiv.setAttribute('data-index', index);
        taskDiv.setAttribute('data-column', column);
        taskDiv.innerHTML = `
            <strong>${task.title}</strong>
            <p>${task.description}</p>
            <button onclick="editTask('${column}', ${index})">Editar</button>
            <button onclick="deleteTask('${column}', ${index})">Excluir</button>
        `;
        taskList.appendChild(taskDiv);
      });
    });
    enableDragAndDrop();
  }

  window.addTask = function (column) {
    const title = prompt('Título da tarefa:');
    if (!title) return;
    const description = prompt('Descrição da tarefa:');
    const date = prompt('Data da tarefa (YYYY-MM-DD):');
    currentKanban.tasks[column].push({ title, description, date });
    saveKanban();
    renderTasks();
  };

  window.editTask = function (column, index) {
    const task = currentKanban.tasks[column][index];
    const newTitle = prompt('Editar título:', task.title);
    if (!newTitle) return;
    const newDescription = prompt('Editar descrição:', task.description);
    const newDate = prompt('Editar data (YYYY-MM-DD):', task.date);
    currentKanban.tasks[column][index] = { title: newTitle, description: newDescription, date: newDate };
    saveKanban();
    renderTasks();
  };

  window.deleteTask = function (column, index) {
    if (confirm('Deseja excluir esta tarefa?')) {
      currentKanban.tasks[column].splice(index, 1);
      saveKanban();
      renderTasks();
    }
  };

  function saveKanban() {
    kanbans[currentIndex] = currentKanban;
    localStorage.setItem('kanbans', JSON.stringify(kanbans));
    updateCalendarEvents();
  }

  function enableDragAndDrop() {
    const tasks = document.querySelectorAll('.task');
    const columns = document.querySelectorAll('.task-list');

    tasks.forEach(task => {
      task.addEventListener('dragstart', dragStart);
    });

    columns.forEach(col => {
      col.addEventListener('dragover', dragOver);
      col.addEventListener('drop', drop);
    });
  }

  let draggedTask = null;
  function dragStart(e) {
    draggedTask = this;
  }

  function dragOver(e) {
    e.preventDefault();
  }

  function drop(e) {
    e.preventDefault();
    if (!draggedTask) return;

    const fromColumn = draggedTask.getAttribute('data-column');
    const index = draggedTask.getAttribute('data-index');
    const toColumn = this.id;

    const taskObj = currentKanban.tasks[fromColumn][index];
    currentKanban.tasks[toColumn].push(taskObj);
    currentKanban.tasks[fromColumn].splice(index, 1);

    saveKanban();
    renderTasks();
    draggedTask = null;
  }

  Object.keys(currentKanban.tasks).forEach(createColumn);
  renderTasks();

  backBtn.addEventListener('click', () => {
    localStorage.removeItem('currentKanban');
    location.reload();
  });
}

// 🔹 Decide o que mostrar
if (currentIndex === null) {
  showProjectSelection();
} else {
  showKanban();
}
