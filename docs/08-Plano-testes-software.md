# Plano de testes de software

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>, <a href="05-Projeto-interface.md"> Projeto de interface</a>

**Cenários de Teste**

| **Caso de teste**  | **CT-001 – Cadastrar perfil**  |
|:---: |:---: |
| Requisito associado | RF-002 - A aplicação deve apresentar, na página principal, a funcionalidade de cadastro de usuários para que estes consigam criar e gerenciar seu perfil. |
| Objetivo do teste | Verificar se o usuário consegue se cadastrar na aplicação. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site http://localhost:5173/cadastro <br> - Clicar em "Cadastre-se" <br> - Preencher os campos obrigatórios (Nome, sobrenome, email, senha, confirmação de senha) <br> - Clicar em "Criar conta gratis" |
| Critério de êxito | - O cadastro foi realizado com sucesso. |
| Guilherme Teixeira | Guilherme Teixeira. |

| **Caso de teste**  | **CT-002 – Efetuar login**  |
|:---: |:---: |
| Requisito associado | RF-002 - A aplicação deve possuir opção de fazer login, sendo o login o endereço de e-mail e senha. |
| Objetivo do teste | Verificar se o usuário consegue realizar login. |
| Passos | - Acessar o navegador <br> - Informar o endereço do site http://localhost:5173/login <br> - Clicar no botão "Entrar" <br> - Preencher o campo de e-mail <br> - Preencher o campo de senha <br> - Clicar em "Login" |
| Critério de êxito | - O login foi realizado com sucesso. |
| Guilherme Teixeira | Guilherme Teixeira. |

| **Caso de teste**  | **CT-003 – Configurações (mudanças de dados de perfil**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve estar logada em alguma conta(para testes, está logada no id 1) |
| Objetivo do teste | Alterar dados do perfil |
| Passos | - acessar com o terminal a pasta src/back/Configuracao, dar npm start, depois vá no terminal na pasta src/front, dar npm run dev. Após isso, abrirá o link que aparecer no terminal. Após, logar( no caso de testes antes da sprint 5, estará logado já na conta de id 1), e realizar as alterações que desejar. |
| Critério de êxito | - Alterações salvas! |
| Responsável pela elaboração do caso de teste | Marcus Vinícius |

| **Caso de teste**  | **CT-004 – Gerenciar tarefas**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve obter o CRUD completo para gerenciamento de tarefas |
| Objetivo do teste | Verificar o funcionamento do sistema de tarefas da aplicação |
| Passos | - Acessar a página de tarefas <br> - Testar a criação de uma tarefa <br> - Clicar no botão "Salvar" <br> - Preencher os campos de criação da tarefa <br> - Verificar se foi criado com êxito tanto na interface quanto no banco efetuando requisições <br> - Tentar editar uma tarefa <br> - Tentar deletar uma tarefa <br> - Tentar concluir uma tarefa <br> |
| Critério de êxito | - Todas as funcionalidades do CRUD funcionaram com êxito |
| Responsável pela elaboração do caso de teste | Gustavo Silva Santiago |

| **Caso de teste**  | **CT-005 – Solicitações**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve obter o CRUD completo para gerenciamento de tarefas |
| Objetivo do teste | Verificar o funcionamento do sistema de solicitações da aplicação |
| Passos | - Acessar a página de solicitações <br> - Clicar no botão nova solicitação <br> - Preencher os campos obrigatorios (título, descrição, prioridade, solicitante, data) <br> - Clicar no botão salvar <br> - Verificar se a solciitação aparece imediatamente na lista de interface <br> - confirmar no banco (via suprabase) <br> - |
| Critério de êxito | - A solicitação é criada corretamente na interface e no banco - As edições são salvas e refletidas tanto no front quanto no banco |
| Responsável pela elaboração do caso de teste | Lara Rossini Rhis |

| **Caso de teste**  | **CT-006 – Gerenciamento de Equipe**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve realizar o CRUD relacionado ao gerenciamento de membros a equipes |
| Objetivo do teste | Gerenciar corretamente os membros e as diversas equipes |
| Passos | - Acessar a página de equipes <br> - Selecionar um usuário <br> - Selecionar uma equipe/departamento <br> - Clicar em "Salvar" <br> Verificar se um novo card foi gerado na tela <br> Tentar editar o card |
| Critério de êxito | - Alerta "Sucesso. Membro vinculado." |
| Responsável pela elaboração do caso de teste | Vinicius Muniz |

| **Caso de teste**  | **CT-007 – Aba do calendário**  |
|:---: |:---: |
| Requisito associado | RF-00Y - A aplicação deve executar todos os comandos do CRUD relacionados ao calendário e eventos |
| Objetivo do teste | Agendar eventos no calendário, marcar datas |
| Passos | - Acessar a página calendário <br> - Selecionar novo evento <br> - Adicionar Ano - Mês - Dia  <br> - Clicar em "Adicionar novo evento" <br> Verificar se novo evento está relacionado ao dia e exposto no mini_calendário <br> editar ou excluir card |
| Critério de êxito | - Novo evento é criado no bando de dados, na tabela tb_eventos, os resultados são expostos no front e uma mensagem do back pode ser visualizada na tela |
| Responsável pela elaboração do caso de teste | Daniel Bleme |
