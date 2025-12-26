### Processo 1 AS IS – Gestão de Projetos.

Atualmente, o processo de gestão de projetos na empresa Arquivar é realizado de forma descentralizada e manual. Cada gestor de área utiliza planilhas próprias, documentos do Word ou ferramentas individuais para registrar o andamento das atividades. Não há um padrão único para o acompanhamento de projetos, o que gera divergências entre equipes e dificulta a consolidação das informações. 

As atualizações de status e o compartilhamento de dados ocorrem, na maioria das vezes, por e-mails ou mensagens em aplicativos de comunicação, tornando o controle das informações fragmentado e sujeito a falhas. A ausência de um histórico centralizado faz com que gestores precisem solicitar constantemente relatórios manuais aos colaboradores, o que resulta em retrabalho e atrasos na obtenção de dados atualizados. 

Além disso, o acompanhamento de prazos e a priorização de tarefas são feitos de forma subjetiva, sem indicadores ou alertas automáticos que sinalizem gargalos. A geração de relatórios gerenciais também é feita de forma manual, consumindo tempo e aumentando o risco de inconsistências nas informações apresentadas à diretoria. 
 
<img width="1463" height="677" alt="Gestão de Projetos - AS IS Diagrama" src="https://github.com/user-attachments/assets/f43a88d8-c706-4058-ada7-aed7cd3aa69b" />


#### Detalhamento das atividades

_As atividades descritas a seguir correspondem ao processo atual (AS IS) de Gestão de Projetos, conforme o modelo apresentado no diagrama, envolvendo o Gestor do Projeto e os Colaboradores, com forte dependência de comunicação manual e ausência de padronização._

_Os tipos de dados a serem utilizados são:_

_* **Área de texto** - registrar informações descritivas e não padronizadas._

_* **Caixa de texto** - inserir dados simples e curtos_

_* **Data** - registrar quando determinadas atividades ocorrem_

_* **Seção única** - serve para apoiar tomadas de decisão exclusivas_

_* **Arquivo** - anexar e compartilhar documentos do projeto_

_* **Numero** - representar quantidades ou durações aproximadas_

**1- Gestor cria novo projeto / Comunicação inicial com a equipe**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Destinatário do e-mail | Caixa de texto   | Deve conter os e-mails dos colaboradores designados ao projeto|                   |
| Assunto do e-mail |   Caixa de texto     |    Nenhuma (texto livre)       |                   |
| Corpo do e-mail           | Área de texto  | Informações do projeto descritas livremente, sem padrão definido|                |
| Anexos           | Arquivo  | Opcional; Qualquer formato de arquivo |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar | Recebimento inicial do projeto  | default         |
|        |                            |                 |
|        |                            |                 |
|        |                            |                 |


**2- Acompanhamento / Análise do andamento do projeto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Relato do andamento do projeto (Input) | Área de texto |   Texto livre, sem padrão definido        |                   |
|        Prazo estimado informado        |       Caixa de texto           |       Formato livre (ex.: “3 dias”, “4 semanas”)      |                   |
|     Verificação de progresso        |       Área de texto        |    Anotação manual e subjetiva sobre o andamento das tarefas       |                   |
|                 |                  |                |                   |
|                 |                  |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Concluir acompanhamento | Avaliação do projeto (Gateway) | default |
|                      |                                |                   |


**3 – Análise de condições do projeto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Prazo estimado de entrega|    Caixa de texto      |     Formato livre (ex.: “15 dias”, “1 mês”)     |
|       Disponibilidade da equipe      |       Caixa de texto        |      Nenhuma (formato livre)       |                   |
|     Recursos necessários      |      Caixa de texto        |    Nenhuma (formato livre)      |                   |
|        Anotações Gerais       |       Área de texto         |     Anotações feitas manualmente sobre a viabilidade do projeto     |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Concluir Análise de Condições | Avaliação do projeto (Gateway) | default |

**4 – Consolidação do andamento do projeto**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Lista de atividades do projeto |    Tabela      |         TTabela em planilha (ex.: Excel) com colunas “Atividade”, “Responsável” e “Observações”         |
|       Status da atividade         |      Caixa de texto      |      Texto livre digitado manualmente na tabela         |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Finalizar consolidação | Avaliação do projeto (Gateway) | default |
