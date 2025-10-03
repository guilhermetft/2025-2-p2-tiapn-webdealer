### Processo 2 TO BE – NOME DO PROCESSO

A solução proposta é a implementação de um portal de atendimento único e centralizado. Ao acessar o portal para abrir uma nova solicitação, o cliente será apresentado a um menu simples onde deverá indicar o setor com o qual deseja falar.

Com base na escolha do cliente, o sistema encaminha a demanda de forma automática para a fila de atendimento do setor correto. A equipe daquele setor recebe uma notificação em tempo real e já pode iniciar o atendimento, pois tem a certeza de que aquela solicitação pertence à sua área de responsabilidade. O cliente, por sua vez, recebe um número de protocolo e pode acompanhar o status do seu chamado diretamente pelo portal.

![Exemplo de um Modelo BPMN do PROCESSO 2](../images/process.png "Modelo BPMN do Processo 2.")

#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 2. 
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

**Detecção de problema/dúvida**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
| ***Exemplo:***  |                  |                |                   |
|       Descrever situação     | Área de Texto   |  |                |
| Anexar arquivos           | Arquivos   | Mais de um campo para anexos |           |
|       Selecionar setor    |  Seleção única  |  |           |
|       Selecionar natureza    |  Seleção única  |  |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| Enviar              |        Fim da abertura do protocolo       | default           |


**Nome da atividade 2**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| [Nome do campo] | [tipo de dados]  |                |                   |
|                 |                  |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|                      |                                |                   |
