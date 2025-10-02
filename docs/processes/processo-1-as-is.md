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


**Nome da atividade 1**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| ***Exemplo:***  |                  |                |                   |
| login           | Caixa de Texto   | formato de e-mail |                |
| senha           | Caixa de Texto   | mínimo de 8 caracteres |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| ***Exemplo:***       |                                |                   |
| entrar               | Fim do Processo 1              | default           |
| cadastrar            | Início do processo de cadastro |                   |


**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
