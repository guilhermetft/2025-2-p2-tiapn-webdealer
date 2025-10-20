const kanbansContainer = document.getElementById('kanbansContainer');
const createBtn = document.getElementById('createKanbanBtn');

let kanbans = JSON.parse(localStorage.getItem('kanbans')) || [];

function renderKanbans() {
  kanbansContainer.innerHTML = '';
  kanbans.forEach((kanban, index) => {
    const div = document.createElement('div');
    div.classList.add('kanban-card');
    div.innerHTML = `
            <h2>${kanban.name}</h2>
            <button onclick="openKanban(${index})">Abrir</button>
            <button onclick="deleteKanban(${index})">Excluir</button>
        `;
    kanbansContainer.appendChild(div);
  });
}   

function renderTopProjects() {
  const lastProjectsDiv = document.getElementById('lastProjects');
  lastProjectsDiv.innerHTML = '';

  // Pega os dois últimos projetos
  const lastTwo = kanbans.slice(-2).reverse();

  lastTwo.forEach((kanban, index) => {
    const div = document.createElement('div');
    div.classList.add('project-card');
    div.innerHTML = `
      <h3>${kanban.name}</h3>
      <button onclick="openKanban(${kanbans.length - 1 - index})">Abrir</button>
    `;
    lastProjectsDiv.appendChild(div);
  });
}

const createProjectCard = document.getElementById('createProjectCard');
createProjectCard.addEventListener('click', createKanban);

renderKanbans();
renderTopProjects();

function createKanban() {
  const name = prompt("Nome do Kanban / Projeto:");
  if (name) {
    kanbans.push({ name, tasks: { 'A Fazer': [], 'Em Progresso': [], 'Concluído': [] } });
    localStorage.setItem('kanbans', JSON.stringify(kanbans));
    renderKanbans();
    renderTopProjects();
  }
}

function openKanban(index) {
  localStorage.setItem('currentKanban', index);
  window.location.href = 'projects.html';
}

function deleteKanban(index) {
  if (confirm("Deseja realmente excluir este Kanban?")) {
    kanbans.splice(index, 1);
    localStorage.setItem('kanbans', JSON.stringify(kanbans));
    renderKanbans();
    renderTopProjects();
  }
}

createBtn.addEventListener('click', createKanban);
renderKanbans();
