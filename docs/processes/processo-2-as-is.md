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

**1 – Identificar necessidade de nova tarefa**

| Campo                    | Tipo          | Restrições                            | Valor default |
| ------------------------ | ------------- | ------------------------------------- | ------------- |
| Descrição da Necessidade | Área de texto | Obrigatório                           |               |
| Área/Projeto             | Seleção única | Lista de áreas ou projetos da empresa |               |
| Prioridade               | Seleção única | Baixa, Média, Alta                    | Média         |
| Data de Criação          | Data          | Automático                            | Data atual    |

| Comando               | Destino                     | Tipo    |
| --------------------- | --------------------------- | ------- |
| Registrar Necessidade | Atribuir tarefa manualmente | default |


**2 – Atribuir tarefa manualmente**

| Campo                   | Tipo          | Restrições             | Valor default |
| ----------------------- | ------------- | ---------------------- | ------------- |
| Colaborador Responsável | Seleção única | Lista de colaboradores |               |
| Descrição da Tarefa     | Área de texto | Obrigatório            |               |
| Prazo                   | Data          | Obrigatório            |               |
| Status da Tarefa        | Seleção única | Aberta, Em andamento   | Aberta        |

| Comando       | Destino               | Tipo    |
| ------------- | --------------------- | ------- |
| Enviar Tarefa | Recebimento da tarefa | default |


**3 – Solicitar atualização de andamento**

| Campo                | Tipo          | Restrições                  | Valor default |
| -------------------- | ------------- | --------------------------- | ------------- |
| Tarefa               | Seleção única | Lista de tarefas atribuídas |               |
| Mensagem de Cobrança | Área de texto | Texto livre                 |               |
| Data da Solicitação  | Data          | Automático                  | Data atual    |


| Comando               | Destino                      | Tipo    |
| --------------------- | ---------------------------- | ------- |
| Solicitar Atualização | Recebe pedido de atualização | default |


**4 – Registrar conclusão ou nova cobrança**

| Campo                    | Tipo          | Restrições           | Valor default |
| ------------------------ | ------------- | -------------------- | ------------- |
| Confirmação de Conclusão | Seleção única | Sim, Não             |               |
| Observações do Gestor    | Área de texto | Texto livre          |               |
| Status da Tarefa         | Seleção única | Concluída, Em atraso |               |


| Comando             | Destino                       | Tipo    |
| ------------------- | ----------------------------- | ------- |
| Registrar Conclusão | Fim                           | default |
| Cobrar Novamente    | Cobra novamente o colaborador | default |
