### Processo 1 TO BE – Recrutamento e Seleção de Candidatos.

A solução proposta centraliza todo o processo de recrutamento em uma plataforma digital. O gestor da área inicia a requisição preenchendo um formulário padronizado no sistema, que formaliza todas as especificações da vaga. 

Os candidatos não enviam mais currículos por e-mail; eles se cadastram na plataforma, criando um perfil completo que pode incluir portfólio e projetos. O sistema, então, realiza uma triagem automática com base em filtros pré-definidos pelo RH (como competências técnicas, experiência, formação). Isso permite que a equipe de RH analise apenas um grupo qualificado de candidatos, otimizando seu tempo para uma análise mais estratégica e humana. As etapas seguintes, como agendamento de entrevistas e comunicação, são gerenciadas pela própria plataforma, garantindo agilidade e mantendo os candidatos informados sobre o status de sua aplicação em tempo real.
 
![Exemplo de um Modelo BPMN do PROCESSO 1](../images/process.png "Modelo BPMN do Processo 1.")

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
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |



**Nome da atividade 4**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
