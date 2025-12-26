# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

A arquitetura da solução do WebDealer foi projetada com foco em escalabilidade e organização modular, sendo composta por três camadas principais: Front-end, Back-end e Banco de Dados. Além desses módulos, o sistema conta com hospedagem em nuvem, garantindo maior acessibilidade, desempenho otimizado e disponibilidade contínua da aplicação.

<img width="1449" height="1080" alt="ARQUITETURA DA SOLUÇÃO" src="https://github.com/user-attachments/assets/d53a0893-3d43-4c44-878d-2fadee27c639" />

## Diagrama de classes
<img width="4617" height="4622" alt="Diagrama de classes" src="https://github.com/user-attachments/assets/a730ce8e-0902-4867-813c-c4b5d4ff5b6a" />

##  Modelo de dados
### Modelo conceitual 

O Modelo Entidade-Relacionamento do Webdealer apresenta uma representação conceitual da estrutura de dados do sistema. Ele define as entidades principais, bem como seus respectivos atributos e relacionamentos. O MER abstrai detalhes técnicos e foca na lógica do negócio, sendo fundamental para garantir uma base sólida e coerente na construção do banco de dados, promovendo uma visão clara e estruturada das informações que o sistema irá manipular.

<img width="1031" height="586" alt="modelo_conceitual" src="https://github.com/user-attachments/assets/75e83420-01bf-4309-a9c6-52cb2d77d974" />

### Modelo relacional

O modelo relacional corresponde à representação dos dados, organizando as informações em tabelas (relações) compostas por linhas (tuplas) e colunas (atributos), juntamente com as restrições de integridade, chaves primárias e chaves estrangeiras.

Elabore o modelo utilizando uma ferramenta de modelagem apropriada.

<img width="731" height="788" alt="bancosupabase" src="https://github.com/user-attachments/assets/6b8ab1b0-9b33-43b1-8ba0-7b40afc905bc" />

### Modelo físico

```sql
-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.tb_equipes (
  id_equipe bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  titulo_equipe character varying NOT NULL,
  descricao text,
  departamento character varying,
  lider_id integer,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT tb_equipes_pkey PRIMARY KEY (id_equipe)
);
CREATE TABLE public.tb_eventos (
  id_evento bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome_evento text,
  email_usuario_evento character varying,
  data_evento date,
  hora_evento time without time zone,
  descricao_evento text,
  CONSTRAINT tb_eventos_pkey PRIMARY KEY (id_evento)
);
CREATE TABLE public.tb_membros (
  id_usuario bigint,
  id_equipes bigint,
  id_membros bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  CONSTRAINT tb_membros_pkey PRIMARY KEY (id_membros),
  CONSTRAINT tb_membros_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.tb_usuario(id_usuario),
  CONSTRAINT tb_membros_id_equipes_fkey FOREIGN KEY (id_equipes) REFERENCES public.tb_equipes(id_equipe)
);
CREATE TABLE public.tb_mensagens (
  id_mensagem bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  chat_canal text NOT NULL,
  author_mensagem text NOT NULL,
  user_id text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  team_id text DEFAULT 'none'::text,
  CONSTRAINT tb_mensagens_pkey PRIMARY KEY (id_mensagem)
);
CREATE TABLE public.tb_projeto (
  id_projeto integer NOT NULL DEFAULT nextval('tb_projeto_id_projeto_seq'::regclass),
  nome_projeto text NOT NULL,
  descricao text,
  status text DEFAULT 'planning'::text,
  progresso integer DEFAULT 0,
  prazo date,
  data_criacao timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tb_projeto_pkey PRIMARY KEY (id_projeto)
);
CREATE TABLE public.tb_projeto_usuario (
  id_projeto integer NOT NULL,
  id_usuario integer NOT NULL,
  CONSTRAINT tb_projeto_usuario_pkey PRIMARY KEY (id_projeto, id_usuario),
  CONSTRAINT tb_projeto_usuario_id_projeto_fkey FOREIGN KEY (id_projeto) REFERENCES public.tb_projeto(id_projeto),
  CONSTRAINT tb_projeto_usuario_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.tb_usuario(id_usuario)
);
CREATE TABLE public.tb_solicitacoes (
  id_solicitacao bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  titulo_solicitacao text DEFAULT 'Sem titulo'::text,
  prioridade_solicitacao character varying,
  descricao_solicitacao text,
  solicitante_solicitacao text,
  prazo_solicitacao date,
  CONSTRAINT tb_solicitacoes_pkey PRIMARY KEY (id_solicitacao)
);
CREATE TABLE public.tb_tarefa_projeto (
  id_tarefa integer NOT NULL DEFAULT nextval('tb_tarefa_projeto_id_tarefa_seq'::regclass),
  id_projeto integer,
  titulo text NOT NULL,
  descricao text,
  status text DEFAULT 'todo'::text,
  prioridade text DEFAULT 'medium'::text,
  data_criacao timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT tb_tarefa_projeto_pkey PRIMARY KEY (id_tarefa),
  CONSTRAINT tb_tarefa_projeto_id_projeto_fkey FOREIGN KEY (id_projeto) REFERENCES public.tb_projeto(id_projeto)
);
CREATE TABLE public.tb_tarefas (
  id_tarefa bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  criacao_tarefa timestamp with time zone NOT NULL DEFAULT now(),
  titulo_tarefa text,
  prioridade_tarefa text,
  status_tarefa text,
  prazo_tarefa date,
  responsavel_tarefa bigint,
  descricao_tarefa text,
  CONSTRAINT tb_tarefas_pkey PRIMARY KEY (id_tarefa),
  CONSTRAINT tb_tarefas_responsavel_tarefa_fkey FOREIGN KEY (responsavel_tarefa) REFERENCES public.tb_usuario(id_usuario)
);
CREATE TABLE public.tb_usuario (
  id_usuario bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  nome_usuario text NOT NULL,
  email_usuario character varying NOT NULL,
  senha_usuario character varying NOT NULL,
  sobre_usuario text,
  cargo character varying,
  telefone character varying,
  empresa_usuario text,
  foto_url text,
  departamento text,
  CONSTRAINT tb_usuario_pkey PRIMARY KEY (id_usuario)
);

```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias

O front-end será desenvolvido utilizando React em conjunto com o Vite, visando a criação de umaaplicação SPA (Single Page Application) moderna e de carregamento otimizado. O layout será estruturado por meio de componentes reutilizáveis e estilizado com Tailwind CSS, framework que oferece produtividade e consistência visual por meio de classes utilitárias. Em pontos específicos da aplicação, será utilizado jQuery para facilitar manipulações pontuais do DOM e aprimorar interações dinâmicas. Todo o ambiente de desenvolvimento será configurado no Visual Studio Code, aproveitando suas extensões e recursos de depuração integrados.

Na camada de back-end, será utilizada a stack Node.js, responsável pelo processamento das requisições e comunicação entre o front-end e o banco de dados. A API será estruturada de forma modular e escalável, adotando o padrão RESTful para integração eficiente com o cliente.

O sistema de persistência de dados será implementado com o Supabase, um banco de dados online fácil de usar, baseado em PostgreSQL. Ele garante integridade, segurança e desempenho nas operações de leitura e escrita. A comunicação entre o servidor e o banco será feita através de consultas SQL e APIs fornecidas pelo Supabase, priorizando simplicidade, clareza e rápida integração.

O versionamento do código será gerenciado pelo Git, com repositório hospedado no GitHub, permitindo controle de histórico, colaboração em equipe e integração com ferramentas de deploy.

A hospedagem do WebDealer foi estruturada separando front-end e back-end. O front-end foi hospedado na Vercel, o que facilitou o deploy automático a partir do GitHub e garantiu melhor performance na entrega da interface ao usuário. Já o back-end foi hospedado no Render, responsável por disponibilizar a API, gerenciar as regras de negócio e a comunicação com o banco de dados. Essa arquitetura desacoplada deixou o sistema mais organizado, escalável e próximo de um ambiente real de produção.

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end | React + CSS + JavaScript |
| Back-end | Node.js |
| Frameworks e Bibliotecas | React + Tailwind + jQuery |
| SGBD | SupaBase |
| Autenticação | JWT/Token |
| Hospedagem / Deploy | Vercel + Render |
| Versionamento | Git + GitHub |
| IDE | Visual Studio Code |

## Hospedagem

A hospedagem do WebDealer foi pensada de forma estratégica, separando o front-end do back-end para garantir melhor desempenho, escalabilidade e facilidade de manutenção.

O front-end da aplicação foi hospedado na Vercel, plataforma especializada em aplicações web modernas. A Vercel permitiu um deploy rápido e integrado diretamente ao repositório GitHub, garantindo atualizações automáticas a cada novo commit. Além disso, ela oferece ótima performance, entrega eficiente dos arquivos estáticos e suporte nativo a aplicações em React, o que contribuiu para uma experiência mais fluida para o usuário final.

Já o back-end foi hospedado no Render, que ficou responsável por executar a API e gerenciar a comunicação com o banco de dados. Essa separação permitiu que o servidor fosse escalado de forma independente do front-end, além de facilitar o controle das rotas, autenticação e regras de negócio da aplicação. O Render também possibilitou a configuração de variáveis de ambiente e garantiu que a API estivesse disponível de forma contínua para o consumo do front.

Com essa arquitetura desacoplada, o WebDealer se tornou mais organizado, robusto e próximo de um cenário real de produção, seguindo boas práticas utilizadas no mercado de desenvolvimento web. Essa escolha de hospedagem foi fundamental para garantir estabilidade, segurança e facilidade de evolução do sistema.

# Qualidade de Software

A qualidade de software pode ser entendida como o conjunto de características que garante que o produto atenda às necessidades dos usuários e expectativas dos stakeholders. No desenvolvimento deste projeto, a equipe selecionou algumas subcaracterísticas do padrão **ISO/IEC 25010** para nortear o desenvolvimento e medir a qualidade do sistema.

**Completude Funcional**  
O software implementa todas as funções especificadas nos requisitos, garantindo que as funcionalidades prometidas estejam disponíveis para o usuário.  
*Métricas:* Cobertura de requisitos funcionais; contagem de funções críticas ausentes.  

**Utilização de Recursos**  
Os recursos de hardware e software (CPU, memória, armazenamento, largura de banda) são utilizados de forma eficiente, garantindo desempenho ao menor custo.  
*Métricas:* Utilização média de CPU/memória; taxa de transferência de dados.  

**Operabilidade**  
O sistema é fácil de operar e intuitivo, com fluxos alinhados às tarefas do usuário.  
*Métricas:* Tempo médio para conclusão de tarefas; número de cliques por tarefa.  

**Proteção Contra Erro do Usuário**  
O software previne erros e oferece mecanismos de recuperação claros.  
*Métricas:* Taxa de erros por tarefa; taxa de sucesso na recuperação.  

**Disponibilidade**  
O sistema permanece acessível durante períodos planejados, com manutenção mínima e baixo tempo de inatividade.  
*Métricas:* Disponibilidade (uptime); tempo médio entre falhas (MTBF); tempo médio para reparo (MTTR).  

**Integridade**  
Os dados e funções do sistema mantêm precisão, completude e validade, prevenindo alterações não autorizadas.  
*Métricas:* Sucesso em verificação de integridade (hash); número de alterações não autorizadas.  

**Responsabilidade**  
Ações e eventos são rastreáveis e atribuíveis, garantindo registro e proteção de dados.  
*Métricas:* Rastreabilidade de eventos críticos; frequência de auditorias de acesso.  

**Autenticidade**  
As identidades de usuários, processos e dados são verificadas de forma segura, garantindo que as entidades são de fato quem afirmam ser.  
*Métricas:* Taxa de tentativas de login bem-sucedidas; conformidade com padrões de senha.  

**Modificabilidade**  
O sistema permite modificações e melhorias de forma eficiente e segura, com baixo risco de introduzir novos erros.  
*Métricas:* Tempo médio para implementar uma mudança (MTTI); índice de instabilidade da mudança.  

**Estabilidade**  
O software mantém desempenho e qualidade consistentes ao longo do tempo, mesmo sob condições variadas.  
*Métricas:* Taxa de falhas de componentes; variação no tempo de resposta (latência).
