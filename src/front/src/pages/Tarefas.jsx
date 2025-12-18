import { useState, useEffect } from 'react';
import '../assets/css/Tarefas.css';

function Tarefas() {
  const [tarefas, setTarefas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [menuAbertoId, setMenuAbertoId] = useState(null);

  const [modalAberto, setModalAberto] = useState(false);
  const [tarefaEmEdicao, setTarefaEmEdicao] = useState(null);

  const [busca, setBusca] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('Todos os Status');

  const [formData, setFormData] = useState({
    titulo: '',
    responsavel_tarefa: '',
    prioridade: 'media',
    prazo_tarefa: ''
  });

  const API_URL = 'https://backwebdealer.onrender.com/tarefas';
  const API_USUARIOS = 'https://backwebdealer.onrender.com/usuarios';

  useEffect(() => {
    const handleClickOutside = () => setMenuAbertoId(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    fetchTarefas();
    fetchUsuarios();
  }, []);

  async function fetchTarefas() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTarefas(data);
      } else {
        console.error('API não retornou um array:', data);
        setTarefas([]);
      }
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      setTarefas([]);
    }
  }

  async function fetchUsuarios() {
    try {
      const response = await fetch(API_USUARIOS);
      const data = await response.json();

      if (Array.isArray(data)) {
        setUsuarios(data);
      } else {
        console.error('API não retornou um array de usuários:', data);
        setUsuarios([]);
      }
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
      setUsuarios([]);
    }
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const textoDigitado = busca.toLowerCase();
    const tituloTarefa = tarefa.titulo_tarefa ? tarefa.titulo_tarefa.toLowerCase() : '';

    let correspondeStatus = true;
    if (filtroStatus === 'Pendente') {
      correspondeStatus = tarefa.status_tarefa === 'pendente';
    } else if (filtroStatus === 'Concluída') {
      correspondeStatus = tarefa.status_tarefa === 'concluida';
    }

    return tituloTarefa.includes(textoDigitado) && correspondeStatus;
  });

  const handleSalvarTarefa = async (e) => {
    e.preventDefault();

    const method = tarefaEmEdicao ? 'PUT' : 'POST';
    const url = tarefaEmEdicao
      ? `${API_URL}/${tarefaEmEdicao.id_tarefa}`
      : API_URL;

    const body = {
      titulo: formData.titulo,
      prioridade: formData.prioridade,
      status: tarefaEmEdicao ? tarefaEmEdicao.status_tarefa : 'pendente',
      prazo_tarefa: formData.prazo_tarefa || null,
      responsavel_tarefa: Number(formData.responsavel_tarefa)
    };

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        setModalAberto(false);
        setTarefaEmEdicao(null);
        limparFormulario();
        fetchTarefas();
      } else {
        const errorData = await response.json();
        alert(`Erro ao salvar: ${errorData.error || 'Erro desconhecido'}`);
        console.error('Erro retornado pela API:', errorData);
      }
    } catch (error) {
      console.error('Erro de conexão/rede:', error);
      alert("Erro de conexão com o servidor.");
    }
  };

  const toggleConcluido = async (id, statusAtual) => {
    const novoStatus = statusAtual === 'concluida' ? 'pendente' : 'concluida';

    setTarefas(tarefas.map(t =>
      t.id_tarefa === id ? { ...t, status_tarefa: novoStatus } : t
    ));

    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
      });
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      fetchTarefas();
    }
  };

  const deletarTarefa = async (id) => {
    if (!window.confirm("Excluir esta tarefa?")) return;

    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setTarefas(tarefas.filter(t => t.id_tarefa !== id));
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const limparFormulario = () => {
    setFormData({
      titulo: '',
      responsavel_tarefa: '',
      prioridade: 'media',
      prazo_tarefa: ''
    });
  };

  const abrirNovaTarefa = () => {
    setTarefaEmEdicao(null);
    limparFormulario();
    setModalAberto(true);
  };

  const abrirEditarTarefa = (tarefa) => {
    setTarefaEmEdicao(tarefa);
    setFormData({
      titulo: tarefa.titulo_tarefa,
      responsavel_tarefa: tarefa.responsavel_tarefa || '',
      prioridade: tarefa.prioridade_tarefa,
      prazo_tarefa: tarefa.prazo_tarefa || ''
    });
    setModalAberto(true);
  };

  return (
    <div className="tarefas-container">
      <header className="tarefas-header">
        <div className="header-text">
          <h1>Tarefas</h1>
          <p>Gerencie e acompanhe todas as tarefas da equipe</p>
        </div>
        <button className="btn-nova-tarefa" onClick={abrirNovaTarefa}>
          <span>+</span> Nova Tarefa
        </button>
      </header>

      <div className="filters-area">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Buscar tarefas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <select
          className="filter-select"
          value={filtroStatus}
          onChange={(e) => setFiltroStatus(e.target.value)}
        >
          <option>Todos os Status</option>
          <option>Pendente</option>
          <option>Concluída</option>
        </select>
      </div>

      <div className="lista-panel">
        <h3>Lista de Tarefas</h3>

        <div className="cards-wrapper">
          {tarefasFiltradas.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#9ca3af', padding: '20px' }}>
              Nenhuma tarefa encontrada.
            </p>
          ) : (
            tarefasFiltradas.map((tarefa) => {
              const isConcluida = tarefa.status_tarefa === 'concluida';
              const statusLabel = isConcluida ? 'Concluída' : 'Pendente';
              const statusClass = isConcluida ? 'concluida' : 'pendente';
              const usuario = usuarios.find(u => u.id_usuario === tarefa.responsavel_tarefa);

              return (
                <div key={tarefa.id_tarefa} className={`task-card ${isConcluida ? 'card-concluido' : ''}`}>
                  <div className="task-left">
                    <div className="checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={isConcluida}
                        onChange={() => toggleConcluido(tarefa.id_tarefa, tarefa.status_tarefa)}
                      />
                    </div>
                    <div className="task-info">
                      <h4 className="task-title" onClick={() => toggleConcluido(tarefa.id_tarefa, tarefa.status_tarefa)}>
                        {tarefa.titulo_tarefa}
                      </h4>
                      <span className="task-assignee">
                        Atribuído a: {usuario?.nome_usuario || 'Não atribuído'}
                      </span>
                    </div>
                  </div>

                  <div className="task-right">
                    {tarefa.prioridade_tarefa && (
                      <span className={`badge ${tarefa.prioridade_tarefa}`}>
                        {tarefa.prioridade_tarefa}
                      </span>
                    )}

                    <span className={`badge-status ${statusClass}`}>
                      {statusLabel}
                    </span>

                    <span className="task-date">{tarefa.prazo_tarefa}</span>

                    <div className="menu-container" onClick={(e) => e.stopPropagation()}>
                      <button
                        className="btn-menu-dots"
                        onClick={() => setMenuAbertoId(menuAbertoId === tarefa.id_tarefa ? null : tarefa.id_tarefa)}
                      >
                        ⋮
                      </button>

                      {menuAbertoId === tarefa.id_tarefa && (
                        <div className="dropdown-menu">
                          <button onClick={() => {
                            abrirEditarTarefa(tarefa);
                            setMenuAbertoId(null);
                          }}>✏️ Editar</button>

                          <button className="btn-delete-menu" onClick={() => {
                            deletarTarefa(tarefa.id_tarefa);
                            setMenuAbertoId(null);
                          }}>🗑️ Excluir</button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{tarefaEmEdicao ? 'Editar Tarefa' : 'Nova Tarefa'}</h2>
            <form onSubmit={handleSalvarTarefa}>
              <div className="form-group">
                <label>Título da Tarefa</label>
                <input
                  type="text"
                  placeholder="Ex: Digitalizar documentos..."
                  value={formData.titulo}
                  onChange={e => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Atribuído a (Nome do Responsável)</label>
                <select
                  className="custom-select"
                  value={formData.responsavel_tarefa}
                  onChange={e => setFormData({ ...formData, responsavel_tarefa: e.target.value })}
                  required
                >
                  <option value="">Selecione um usuário</option>
                  {usuarios.map(u => (
                    <option key={u.id_usuario} value={u.id_usuario}>
                      {u.nome_usuario}
                    </option>
                  ))}
                </select>
              </div>

              <div className="row-inputs">
                <div className="form-group">
                  <label>Prioridade</label>
                  <select
                    value={formData.prioridade}
                    onChange={e => setFormData({ ...formData, prioridade: e.target.value })}
                  >
                    <option value="baixa">Baixa</option>
                    <option value="media">Média</option>
                    <option value="alta">Alta</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Data Limite</label>
                  <input
                    type="date"
                    value={formData.prazo_tarefa}
                    onChange={e => setFormData({ ...formData, prazo_tarefa: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-cancel" onClick={() => setModalAberto(false)}>Cancelar</button>
                <button type="submit" className="btn-save">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tarefas;