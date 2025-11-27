# Arquitetura da solução

<span style="color:red">Pré-requisitos: <a href="05-Projeto-interface.md"> Projeto de interface</a></span>

A arquitetura da solução do WebDealer foi projetada com foco em escalabilidade e organização modular, sendo composta por três camadas principais: Front-end, Back-end e Banco de Dados. Além desses módulos, o sistema conta com hospedagem em nuvem, garantindo maior acessibilidade, desempenho otimizado e disponibilidade contínua da aplicação.

![Arquitetura da Solução](images/arquitetura.png)

## Diagrama de classes

O diagrama de classes ilustra graficamente a estrutura do software e como cada uma das classes estará interligada. Essas classes servem de modelo para materializar os objetos que serão executados na memória.

Elabore o diagrama de classes utilizando uma ferramenta de modelagem apropriada.

##  Modelo de dados
### Modelo conceitual 

O Modelo Entidade-Relacionamento do Webdealer apresenta uma representação conceitual da estrutura de dados do sistema. Ele define as entidades principais, bem como seus respectivos atributos e relacionamentos. O MER abstrai detalhes técnicos e foca na lógica do negócio, sendo fundamental para garantir uma base sólida e coerente na construção do banco de dados, promovendo uma visão clara e estruturada das informações que o sistema irá manipular.

<img width="1031" height="586" alt="modelo_conceitual" src="https://github.com/user-attachments/assets/75e83420-01bf-4309-a9c6-52cb2d77d974" />

### Modelo relacional

O modelo relacional corresponde à representação dos dados, organizando as informações em tabelas (relações) compostas por linhas (tuplas) e colunas (atributos), juntamente com as restrições de integridade, chaves primárias e chaves estrangeiras.

Elabore o modelo utilizando uma ferramenta de modelagem apropriada.

<img width="1030" height="853" alt="modelo_relacional PNG" src="https://github.com/user-attachments/assets/fd6e0869-c8ba-489b-b931-47974bdfbec7" />

### Modelo físico

```sql
CREATE TABLE usuario (
  id_usuario UUID PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  senha TEXT NOT NULL,
  tipo tipo_usuario NOT NULL DEFAULT 'colaborador'
);

CREATE TABLE projeto (
  id_projeto UUID PRIMARY KEY,
  nome VARCHAR(150) NOT NULL,
  descricao TEXT,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  status status_projeto NOT NULL DEFAULT 'em_andamento',
  id_criador UUID REFERENCES usuario(id_usuario) ON DELETE SET NULL,
  criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE participacao (
  id_participacao UUID PRIMARY KEY,
  id_usuario UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE,
  id_projeto UUID REFERENCES projeto(id_projeto) ON DELETE CASCADE,
  cargo VARCHAR(100),
  UNIQUE (id_usuario, id_projeto)
);

CREATE TABLE tarefa (
  id_tarefa UUID PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descricao TEXT,
  prioridade prioridade_tarefa NOT NULL DEFAULT 'media',
  status status_tarefa NOT NULL DEFAULT 'pendente',
  prazo DATE,
  data_criacao TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  id_projeto UUID REFERENCES projeto(id_projeto) ON DELETE CASCADE,
  id_responsavel UUID REFERENCES usuario(id_usuario) ON DELETE SET NULL
);

CREATE TABLE comentario (
  id_comentario UUID PRIMARY KEY,
  texto TEXT NOT NULL,
  data_envio TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  id_tarefa UUID REFERENCES tarefa(id_tarefa) ON DELETE CASCADE,
  id_usuario UUID REFERENCES usuario(id_usuario) ON DELETE CASCADE
);

```
Esse script deverá ser incluído em um arquivo .sql na pasta [de scripts SQL](../src/db).


## Tecnologias

O front-end será desenvolvido utilizando React em conjunto com o Vite, visando a criação de uma aplicação SPA (Single Page Application) moderna e de carregamento otimizado. O layout será estruturado por meio de componentes reutilizáveis e estilizado com Tailwind CSS, framework que oferece produtividade e consistência visual por meio de classes utilitárias. Em pontos específicos da aplicação, será utilizado jQuery para facilitar manipulações pontuais do DOM e aprimorar interações dinâmicas. Todo o ambiente de desenvolvimento será configurado no Visual Studio Code, aproveitando suas extensões e recursos de depuração integrados. 

Na camada de back-end, será utilizada a stack Node.js, responsável pelo processamento das requisições e comunicação entre o front-end e o banco de dados. A API será estruturada de forma modular e escalável, adotando o padrão RESTful para integração eficiente com o cliente. 

O sistema de persistência de dados será implementado com o MySQL, banco relacional amplamente utilizado, que garantirá a integridade e o desempenho das operações de leitura e escrita. A comunicação entre o servidor e o banco será feita através de consultas SQL diretas, priorizando simplicidade e clareza nas interações. 

O versionamento do código será gerenciado pelo Git, com repositório hospedado no GitHub, permitindo controle de histórico, colaboração em equipe e integração com ferramentas de deploy. 

A hospedagem da aplicação será realizada na plataforma Microsoft Azure, que fornecerá os serviços de deploy do back-end e front-end, além da integração com o banco de dados em nuvem. O Azure permitirá o gerenciamento unificado dos recursos do sistema, com escalabilidade automática e monitoramento contínuo de desempenho. 

| **Dimensão**   | **Tecnologia**  |
| ---            | ---             |
| Front-end | HTML5 + CSS + JS |
| Back-end | Node.js |
| Frameworks e Bibliotecas | React + Tailwind + jQuery |
| SGBD | MySQL |
| Autenticação |  |
| Hospedagem / Deploy | Vercel |
| Versionamento | Git + GitHub |
| IDE | Visual Studio Code |


## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foram realizados.

> **Links úteis**:
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando seu site no Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de software

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
