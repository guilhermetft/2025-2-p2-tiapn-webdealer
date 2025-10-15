### Processo 2 AS IS – Acompanhamento de Tarefas.

Atualmente, o acompanhamento das tarefas internas na empresa Arquivar é realizado de forma pouco estruturada e com grande dependência de comunicação informal entre gestores e colaboradores. As atividades são atribuídas verbalmente, por e-mail ou por mensagens instantâneas, sem um registro centralizado que permita o monitoramento do progresso das ações. 

Essa falta de controle faz com que informações sobre prazos, responsáveis e status das tarefas se percam com frequência, dificultando a identificação de prioridades e o acompanhamento do andamento geral dos projetos. Em muitos casos, o gestor precisa solicitar manualmente atualizações sobre o que foi concluído, o que gera atrasos e retrabalho. 

A ausência de uma plataforma integrada também compromete a colaboração entre as equipes. As trocas de informações sobre tarefas são dispersas, dificultando a continuidade do trabalho quando há substituições ou mudanças de responsáveis. Além disso, não há métricas confiáveis para avaliar o desempenho das equipes, o que limita a tomada de decisões estratégicas e o reconhecimento de esforços individuais.

<img width="1942" height="733" alt="Acompanhamento de Tarefas - AS IS Diagrama" src="https://github.com/user-attachments/assets/1d00d81b-ab0c-436f-98ca-e703d1e9644f" />

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

**Nome da atividade 1- Cliente entra em contato a respeito do problema/dúvida**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Destinatário do e-mail | Caixa de texto |  Deve ser o e-mail de suporte da empresa  |                   |
| Assunto do e-mail  |       Caixa de texto           |  Nenhuma (texto livre)  |                   |
| Corpo do e-mail           | Área de texto   | Nenhuma (cliente descreve o problema livremente) |                |
| Anexos           | Arquivo | Opcional; Formato de arquivo. |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| Enviar | Empresa(Recebimento da dúvida) | default |


**Nome da atividade 2- Análise da Dúvida**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Cliente | Caixa de texto   |   Nenhuma (texto livre)   |                   |
|  Assunto Resumido  | Caixa de texto   |   Nenhuma (atendente resume o problema)  |                   |
|  Classificação  | Caixa de texto   |  Nenhuma (Classificação por Área)    |                   |
|  Status   | Caixa de texto   |  Classificação formal de apresentação  |  Ativo  |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| Salvar Planilha | Ánalise de duvida/problema  | default |


**Nome da atividade 3- Análise do problema/dúvida**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|  Registro da Análise  |  Área de texto  |  Nenhuma (atendente descreve os passos da investigação)   |                   |
|  Solução Encontrada  |  Área de texto  |   Nenhuma (atendente descreve o texto da solução a ser enviada ao cliente)  |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|  Concluir Análise  |  Problema/dúvida solucionada  |   default  |


**Nome da atividade 4- Retorno com o cliente**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
|  Destinatário do e-mail  |  Caixa de texto |  Deve ser o e-mail do cliente que abriu o chamado   |                   |
|  Assunto do e-mail  |  Caixa de texto  |   Nenhuma (texto livre)  |                   |
|  Corpo do e-mail  |  Área de texto  |   Nenhuma (texto da resposta escrito livremente)  |                   |


| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
|  Enviar Resposta  |  Fim  |   default  |
