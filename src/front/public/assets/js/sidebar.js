const sidebarHTML = `
<div class="sidebar" id="sidebar">
  <div class="toggle-btn" onclick="toggleSidebar()">☰</div>

  <div class="sidebar-links">
    <a href="index.html"><span class="icon">🏠</span><span class="text">Home</span></a>
    <a href="calendar.html"><span class="icon">📅</span><span class="text">Calendário</span></a>
    <a href="projects.html"><span class="icon">📂</span><span class="text">Projetos</span></a>
    <a href="contato.html"><span class="icon">✉️</span><span class="text">Contato</span></a>
  </div>

  <div class="sidebar-bottom">
    <a href="logout.html"><span class="icon">➜]</span><span class="text">Sair</span></a>
  </div>
</div>
`;

// Adiciona a sidebar ao container
document.getElementById('sidebar-container').innerHTML = sidebarHTML;

// Função toggle
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
