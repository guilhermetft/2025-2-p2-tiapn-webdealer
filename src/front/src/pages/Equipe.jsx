import { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/css/Equipes.component.css';
import '../assets/css/Equipescard.component.css';


function Equipescard({ nome, email, nomeEquipe }) {
    return (
        <div className="card">
            <div className="card-left">
                <div className="avatar">{nome?.substring(0, 3).toUpperCase()}</div>
                <div className="info">
                    <div className="nome-status">
                        <span className="nome">{nome}</span>
                        <span className="status">ativo</span>
                    </div>
                    
                    {/* Exibe o nome da equipe */}
                    <p className="funcao" style={{fontWeight: 'bold', color: '#555'}}>
                        {nomeEquipe || "Sem equipe definida"}
                    </p>
                    
                    <p className="email">{email}</p>
                </div>
            </div>
            <div className="card-right">
                <button className="menu-btn">⋮</button>
            </div>
        </div>
    );
}



function ModalAdicionar({ onClose, onConfirmAdd }) {
    const [usuarios, setUsuarios] = useState([]);
    const [equipes, setEquipes] = useState([]); 
    
    const [usuarioSelecionado, setUsuarioSelecionado] = useState('');
    const [equipeSelecionada, setEquipeSelecionada] = useState('');

    useEffect(() => {
        async function carregar() {
            try {
                const rUser = await axios.get('http://localhost:5000/api/usuarios');
                const rEquipe = await axios.get('http://localhost:5000/api/equipes');
                setUsuarios(rUser.data);
                setEquipes(rEquipe.data);
            } catch (error) {
                console.error("Erro ao carregar selects:", error);
                alert("Erro: Não consegui carregar as listas. O Node está rodando?");
            }
        }
        carregar();
    }, []);

    function confirmar() {
        if (!usuarioSelecionado || !equipeSelecionada) {
            alert("Atenção: Você precisa selecionar uma Pessoa E uma Equipe!");
            return;
        }
        onConfirmAdd(usuarioSelecionado, equipeSelecionada); 
        onClose();
    }

    return (
        
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.85)', 
            zIndex: 9999, 
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            
            <div style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '10px',
                width: '400px',
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }}>
                <h2 style={{color: '#333', textAlign: 'center', margin: 0}}>Adicionar Novo</h2>
                <hr style={{border: '1px solid #eee', width: '100%'}}/>

                {/* SELECT PESSOA */}
                <label style={{color: '#333', fontWeight: 'bold'}}>1. Pessoa:</label>
                <select 
                    style={{padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px'}}
                    value={usuarioSelecionado} 
                    onChange={e => setUsuarioSelecionado(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {usuarios.map(u => (
                        // TENTA PEGAR O ID DE TODAS AS FORMAS (Blindagem)
                        <option key={u.id_usuario || u.id} value={u.id_usuario || u.id}>
                            {u.nome_usuario || u.nome}
                        </option>
                    ))}
                </select>

                
                <label style={{color: '#333', fontWeight: 'bold'}}>2. Equipe:</label>
                <select 
                    style={{padding: '10px', border: '1px solid #ccc', borderRadius: '5px', fontSize: '16px'}}
                    value={equipeSelecionada} 
                    onChange={e => setEquipeSelecionada(e.target.value)}
                >
                    <option value="">Selecione...</option>
                    {equipes.map(eq => (
                        
                        <option 
                            key={eq.id_equipe || eq.id_equipes || eq.id} 
                            value={eq.id_equipe || eq.id_equipes || eq.id}
                        >
                            {eq.titulo_equipe || eq.nome_equipe}
                        </option>
                    ))}
                </select>

                <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
                    <button 
                        onClick={onClose} 
                        style={{flex: 1, padding: '12px', background: '#ccc', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px'}}
                    >
                        CANCELAR
                    </button>
                    <button 
                        onClick={confirmar} 
                        style={{flex: 1, padding: '12px', background: '#007bff', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '5px'}}
                    >
                        SALVAR
                    </button>
                </div>
            </div>
        </div>
    );
}


function Equipesmain() {
    const [membros, setMembros] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    useEffect(() => {
        carregarMembros();
    }, []);

    async function carregarMembros() {
        try {
            const response = await axios.get('http://localhost:5000/api/membros');
            setMembros(response.data);
        } catch (error) {
            console.error("Erro listagem:", error);
        }
    }

    async function salvarNovoMembro(idUsuario, idEquipe) {
        try {
            console.log("Enviando para o Node:", { id_usuario: idUsuario, id_equipe: idEquipe });
            
            await axios.post('http://localhost:5000/api/membros', { 
                id_usuario: idUsuario,
                id_equipe: idEquipe
            });
            
            
            await carregarMembros(); // Recarrega a lista
            alert("✅ Sucesso! Card criado.");
        
        } catch (error) {
            console.error("Erro completo:", error);
            
            // Mostra o erro real que veio do servidor
            const mensagemErro = error.response?.data?.error || error.message;
            alert(" ERRO NO SERVIDOR: \n" + mensagemErro);
        }
    }

    return (
        <div>
            <div id="header">
                <div id="cabecalho-texto">
                    <h1 id="main-title">Gestão de Equipes</h1>
                    <h3 id="main-p">Gerencie quem faz parte de cada time</h3>
                </div>
                
                <button 
                    id="btn-add" 
                    onClick={() => setMostrarModal(true)}
                    style={{cursor: 'pointer'}}
                >
                    + Adicionar membro
                </button>
            </div>

            <div id="espaco-membros">
                <h1>Membros ativos</h1>

                {membros.length > 0 ? (
                    membros.map((m, index) => (
                        <Equipescard 
                            key={m.id_vinculo || index} 
                            nome={m.nome_usuario}
                            email={m.email_usuario}
                            nomeEquipe={m.nome_equipe}
                        />
                    ))
                ) : (
                    <div style={{padding: '20px', color: '#666', border: '1px dashed #ccc', margin: '20px'}}>
                        <p>Nenhum membro vinculado ainda.</p>
                        <p style={{fontSize: '12px'}}>Clique no botão "+ Adicionar membro" acima.</p>
                    </div>
                )}

                
                {mostrarModal && (
                    <ModalAdicionar 
                        onClose={() => setMostrarModal(false)}
                        onConfirmAdd={salvarNovoMembro}
                    />
                )}
            </div>
        </div>
    );
}

function Equipe() {
    return <Equipesmain />;
}

export default Equipe;