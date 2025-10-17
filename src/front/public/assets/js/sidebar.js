const sidebarHTML = `
<div class="sidebar" id="sidebar">
  <div class="toggle-btn" onclick="toggleSidebar()">☰</div>
  <a href="index.html"><span class="icon">🏠</span><span class="text">Home</span></a>
  <a href="calendar.html"><span class="icon">📅</span><span class="text">Calendar</span></a>
  <a href="projetos.html"><span class="icon">📂</span><span class="text">Projects</span></a>
  <a href="contato.html"><span class="icon">✉️</span><span class="text">Contact</span></a>
</div>
`;

// Adiciona a sidebar ao container
document.getElementById('sidebar-container').innerHTML = sidebarHTML;

// Função toggle
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('expanded');
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const main = document.querySelector('.main');
  sidebar.classList.toggle('expanded');

  if (sidebar.classList.contains('expanded')) {
    main.style.marginLeft = '220px';
  } else {
    main.style.marginLeft = '60px';
  }
}