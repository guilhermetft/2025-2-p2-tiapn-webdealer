### Processo 1 TO BE – Gestão de Projetos.

A solução proposta centraliza todo o processo de gestão de projetos em uma plataforma web integrada, permitindo o acompanhamento completo desde a criação até a avaliação final. O gestor inicia o processo com a validação e cadastro do projeto, incluindo suas especificações e a equipe responsável. A partir desse momento, o andamento das atividades é registrado automaticamente no sistema, permitindo que colaboradores atualizem o progresso em tempo real. 

O acompanhamento é feito diretamente pela plataforma, eliminando a necessidade de planilhas e comunicações dispersas. A geração automática de dashboards e relatórios oferece uma visão consolidada do desempenho dos projetos, facilitando o monitoramento de prazos, custos e resultados. Ao final, o gestor realiza a avaliação do projeto pela própria interface, podendo solicitar revisões ou aprovar sua conclusão de forma estruturada e rastreável.
 
<img width="1457" height="625" alt="Gestão de Projetos - TO BE Diagrama" src="https://github.com/user-attachments/assets/c5f907f3-7c05-42a7-b0e1-d4e39217081a" />

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
Devem estar relacionadas com o modelo de processo apresentado anteriormente._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - campo texto de múltiplas linhas_

_* **Caixa de texto** - campo texto de uma linha_

_* **Número** - campo numérico_

_* **Data** - campo do tipo data (dd-mm-aaaa)_

_* **Hora** - campo do tipo hora (hh:mm:ss)_

_* **Data e Hora** - campo do tipo data e hora (dd-mm-aaaa, hh:mm:ss)_

_* **Imagem** - campo contendo uma imagem_

_* **Seleção única** - campo com várias opções de valores que são mutuamente exclusivas (tradicional radio button ou combobox)_

_* **Seleção múltipla** - campo com várias opções que podem ser selecionadas mutuamente (tradicional checkbox ou listbox)_

_* **Arquivo** - campo de upload de documento_

_* **Link** - campo que armazena uma URL_

_* **Tabela** - campo formado por uma matriz de valores_


**Nome da atividade 1: Solicitação de processo realizada por dentro da plataforma**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Setor Solicitante  | Seleção única       |        Obrigatório; Lista de setores da empresa            |          |
| Cargo da Vaga  |    Seleção única     |       Obrigatório; Lista de cargos pré-definidos         |                   |
| Habilidades e Competências        | Seleção múltipla  | Obrigatório; Lista de habilidades cadastradas no sistema |                |
| Descrição Detalhada da Vaga         | Área de texto  | Obrigatório; Editor de texto rico |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Divulgar Vaga | Vaga é divulgada automaticamente no WebDealer  | default |
| Salvar como Rascunho      |        (Permanece na mesma tela)           |                   |


**Nome da atividade 2: Candidato preenche análise de perfil e competências**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome Completo | Caixa de texto  |    Obrigatório     |                   |
|     Email        |    Caixa de texto      |    Formato de e-mail válido     |                   |
| Telefone | Caixa de texto  |    Formato (XX) XXXXX-XXXX   |                   |
|     Competências e Habilidades       |    Seleção múltipla     |   O candidato seleciona em uma lista as habilidades que possui      |                   |
| Anexar Currículo | Arquivo  |   Formato PDF ou DOCX; Tamanho máx 5MB     |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Enviar Candidatura | Leitura de candidatos automática | default  |


**Nome da atividade 3: Portfólio e projetos do candidato são avaliados**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Nome do Candidato | Caixa de texto  |  Apenas leitura   |                   |
|   Portfólio e Currículo   |   Link      | Links para visualizar os arquivos e URLs enviados  |                   |
|   Parecer do RH   |   Área de texto    |  Obrigatório se o candidato for movido de etapa   |                   |
|  Decisão da Avaliação    |   Seleção única  |  Opções: 'Prosseguir com candidato', 'Não prosseguir'   |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Salvar e Avançar | Agendamento da entrevista  | default|
| Desqualificar    |   Encerramento do processo   |                   |



**Nome da atividade 4: Registrar Resultado da Entrevista Técnica e Avaliações**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Avaliação das Habilidades | Tabela  | Colunas: 'Habilidade', 'Nota (1-5)', 'Observações'   |                   |
|  Parecer Final do Avaliador   | Área de texto  |   Obrigatório     |                   |
|   Recomendação  |  Seleção única   | Obrigatório; Opções: 'Aprovar candidato', 'Desaprovar candidato'    |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|Finalizar Avaliação |Fim (Processo de contratação ou descarte)  | default |
