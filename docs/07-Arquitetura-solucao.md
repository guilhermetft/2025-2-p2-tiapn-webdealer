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

- Completude Funcional
 O software implementa todas as funções especificadas nos requisitos do usuário e do sistema. Avalia se todas as funcionalidades prometidas estão de fato disponíveis para o usuário final.
 <strong>Métrica:</strong> Cobertura de Requisitos: Porcentagem de requisitos funcionais implementados e testados. * Contagem de Funções Ausentes: Número de funções críticas especificadas que não foram implementadas.
- Utilização de Recursos
  O software utiliza os recursos de hardware e software (memória, CPU, largura de banda, armazenamento) de forma estratégica e eficiente, garantindo o desempenho esperado ao custo mínimo.
   <strong>Métrica:</strong> Utilização Média de CPU/Memória: Porcentagem média de uso da CPU e memória em picos de carga. * Taxa de Transferência de Dados: Volume de dados processados por unidade de tempo, comparado ao limite do sistema.
- Operabilidade
  O sistema é fácil de operar e controlar. Suas operações são intuitivas e estão diretamente interligadas e alinhadas com o fluxo de trabalho e as funções lógicas que o usuário precisa executar.
   <strong>Métrica:</strong> Tempo Médio para Conclusão da Tarefa (TMT): Tempo que um usuário leva para executar uma tarefa específica pela primeira vez. * Cliques por Tarefa: Número de interações necessárias para completar uma função-chave.
- Proteção Contra Erro do Usuário
 O sistema previne ativamente que o usuário cometa erros ou, quando ocorrem, minimiza o impacto e oferece mecanismos de recuperação claros (ex: avisos de confirmação, desfazimento de ações, validações de entrada robustas).
 <strong>Métrica:</strong> Taxa de Erros por Tarefa: Número de erros de entrada ou operação que o usuário comete por tarefa (antes de ser corrigido pelo sistema ou pelo próprio usuário). * Taxa de Sucesso na Recuperação: Porcentagem de vezes que o usuário consegue se recuperar de um erro usando os recursos do sistema.
- Disponibilidade
  O software permanece acessível e operacional para o uso durante períodos de tempo acordados. A exigência de manutenção no sistema é minimizada e planejada, e o tempo de inatividade não planejado é extremamente baixo.
   <strong>Métrica:</strong> Disponibilidade (Uptime): Porcentagem de tempo em que o sistema está operacional (ex: $99,9\%$ de disponibilidade). * Tempo Médio Entre Falhas (MTBF): Tempo médio entre ocorrências de falhas do sistema.  Tempo Médio Para Reparo (MTTR): Tempo médio necessário para restaurar a operação após uma falha.
- Integridade
 Os dados e o próprio software mantêm a precisão, completude e validade (integridade dos dados) e evitam modificações não autorizadas ou inconsistentes. Garante que as funções do sistema não sejam comprometidas.
 <strong>Métrica:</strong> Taxa de Sucesso de Hash de Verificação: Porcentagem de vezes que a verificação de integridade de dados (ex: hashes de arquivos) é bem-sucedida. * Número de Alterações de Dados Não Autorizadas: Contagem de tentativas de manipulação de dados que foram detectadas e prevenidas.
- Responsabilidade
  Ações e eventos dentro do sistema são rastreáveis e atribuíveis a uma entidade (usuário, sistema ou componente). O sistema e seus colaboradores são responsáveis legal e tecnicamente pela proteção, registro e tratamento dos dados do usuário.
   <strong>Métrica:</strong> Rastreabilidade de Eventos Críticos: Porcentagem de eventos de segurança (login, transação) que possuem logs completos com data, hora, usuário e ação. * Frequência de Auditorias de Acesso: Número de verificações de logs para garantir que o acesso aos dados é justificado.
- Autenticidade
  As identidades de usuários, processos e dados são comprovadas e verificadas de forma segura. O sistema garante que as entidades que se apresentam são de fato quem/o que afirmam ser (ex: via login e senhas fortes, certificados digitais).
  <strong>Métrica:</strong>: Taxa de Tentativas de Login Bem-Sucedidas (em relação a falhas): Mede a eficácia dos mecanismos de autenticação. * Conformidade com Padrões de Senha: Porcentagem de senhas que aderem aos requisitos de complexidade e periodicidade
- Modificabilidade
 A capacidade de realizar modificações e melhorias de forma eficiente e segura no sistema, seja para correção de defeitos, adaptação a novos ambientes ou evolução de requisitos. Isso exige baixo risco de introduzir novos defeitos.
 <strong>Métrica:</strong> Tempo Médio para Implementar uma Mudança (MTTI): Tempo necessário desde a aprovação de uma mudança até o deploy em produção. * Índice de Instabilidade da Mudança: Número de defeitos introduzidos por nova release de código ou modificação.
- estabilidade
 O software mantém seu nível de desempenho e qualidade em condições de uso variadas e ao longo do tempo. O sistema deve ser estável e confiável, possuindo uma arquitetura e hospedagem sólida e sistemas bem otimizados.
 Métrica: Taxa de Falhas de Componentes: Número de falhas por módulo ou serviço após um período de tempo. * Variação no Tempo de Resposta (Latência): Desvio padrão no tempo de resposta sob carga constante.

