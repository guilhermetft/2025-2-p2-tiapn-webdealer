### Processo 1 AS IS – Recrutamento e Seleção de Candidatos.

Atualmente, o processo de recrutamento e seleção é iniciado quando um gestor de área comunica a necessidade de uma nova vaga, geralmente de maneira informal, via e-mail ou comunicação direta com o setor de Recursos Humanos (RH). O RH, por sua vez, realiza a divulgação da vaga manualmente em diferentes canais (sites de emprego, redes sociais, etc.), sem uma ferramenta unificada.

Os currículos são recebidos de forma desestruturada, majoritariamente por e-mail, gerando um grande volume de dados não padronizados. A triagem desses currículos é uma tarefa inteiramente manual, baseada na leitura individual de cada documento, o que consome um tempo considerável e está sujeito a vieses inconscientes. Após essa triagem inicial, os candidatos selecionados são contatados para agendamento de entrevistas, um processo logístico complexo e com muitas trocas de mensagens. Por fim, após as rodadas de entrevistas, o candidato final é escolhido e os demais são informados (ou muitas vezes, não recebem retorno), encerrando o ciclo de forma pouco eficiente e com baixa qualidade na experiência do candidato.
 
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
