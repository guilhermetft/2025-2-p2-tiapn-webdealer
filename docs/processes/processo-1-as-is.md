### Processo 1 AS IS – Gestão de Projetos.

Atualmente, o processo de gestão de projetos na empresa Arquivar é realizado de forma descentralizada e manual. Cada gestor de área utiliza planilhas próprias, documentos do Word ou ferramentas individuais para registrar o andamento das atividades. Não há um padrão único para o acompanhamento de projetos, o que gera divergências entre equipes e dificulta a consolidação das informações. 

As atualizações de status e o compartilhamento de dados ocorrem, na maioria das vezes, por e-mails ou mensagens em aplicativos de comunicação, tornando o controle das informações fragmentado e sujeito a falhas. A ausência de um histórico centralizado faz com que gestores precisem solicitar constantemente relatórios manuais aos colaboradores, o que resulta em retrabalho e atrasos na obtenção de dados atualizados. 

Além disso, o acompanhamento de prazos e a priorização de tarefas são feitos de forma subjetiva, sem indicadores ou alertas automáticos que sinalizem gargalos. A geração de relatórios gerenciais também é feita de forma manual, consumindo tempo e aumentando o risco de inconsistências nas informações apresentadas à diretoria. 
 
<img width="1463" height="677" alt="Gestão de Projetos - AS IS Diagrama" src="https://github.com/user-attachments/assets/f43a88d8-c706-4058-ada7-aed7cd3aa69b" />


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


**Nome da atividade 1- Gestor solicita abertura de vagas**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Destinatário do e-mail | Caixa de texto   | Deve ser o e-mail do setor de RH |                   |
| Assunto do e-mail |   Caixa de texto     |    Nenhuma (texto livre)       |                   |
| Corpo do e-mail           | Área de texto  | Nenhuma (informações da vaga descritas livremente, sem padrão)|                |
| Anexos           | Arquivo  | Opcional; Qualquer formato de arquivo |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar | Vaga é aberta manualmente  | default         |
|        |                            |                 |
|        |                            |                 |
|        |                            |                 |


**Nome da atividade 2-  Análise de perfil dos Candidatos**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Arquivo do Currículo (Input) | Arquivo |   Formato não padronizado         |                   |
|        Lista de Requisitos (Referência)         |       Área de texto           |       Texto livre, sem padrão, vindo do e-mail do gestor        |                   |
|      Verificação de Competências         |       Área de texto        |    Anotação manual, sem sistema, para indicar se os requisitos foram atendidos        |                   |
|                 |                  |                |                   |
|                 |                  |                |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Concluir Análise de Perfil | Seleção de candidatos (Gateway) | default |
|                      |                                |                   |


**Nome da atividade 3- Análise condições, localização e pretensão do candidato**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Pretensão Salarial (lida no CV) |    Caixa de texto      |     Nenhuma (formato livre)     |
|       Localização (lida no CV)       |       Caixa de texto        |      Nenhuma (formato livre de endereço)       |                   |
|     Disponibilidade (lida no CV)      |      Caixa de texto        |    Nenhuma (formato livre)      |                   |
|        Anotações Gerais       |       Área de texto         |     Anotações feitas em planilha ou caderno sobre a viabilidade do candidato     |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Concluir Análise de Condições | Seleção de candidatos (Gateway) | default |

**Nome da atividade 4- Criar pré-seleção de funcionários**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Lista de Pré-selecionados |    Tabela      |         Tabela em Excel, com colunas 'Nome do Candidato' e 'Observações'          |
|       Status do Candidato         |      Caixa de texto      |      Texto livre digitado na tabela         |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Finalizar Lista | Seleção de candidatos (Gateway) | default |
