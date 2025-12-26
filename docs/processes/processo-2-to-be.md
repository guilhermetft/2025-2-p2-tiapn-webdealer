### Processo 2 TO BE – Acompanhamento de Tarefas.

A solução proposta consiste na implantação de um sistema de acompanhamento de tarefas totalmente integrado, onde gestores e colaboradores podem interagir dentro de um ambiente centralizado. O gestor acessa o sistema para criar tarefas, definindo prazos, prioridades e responsáveis. Automaticamente, o colaborador recebe uma notificação do sistema com as informações da tarefa atribuída e pode acompanhar o andamento em tempo real. Conforme o progresso das atividades, o colaborador atualiza o status (em andamento ou concluída), e o sistema registra o histórico automaticamente. Caso haja atraso, são emitidos alertas automáticos para o gestor e o responsável. Ao final, o gestor visualiza métricas e relatórios de desempenho consolidados, otimizando o controle e a tomada de decisão. 

<img width="1670" height="1358" alt="Acompanhamento de Tarefas - TO BE Diagrama" src="https://github.com/user-attachments/assets/4e2f1e08-204e-498e-b595-b27ee317bdb5" />

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

**1 – Acessar o sistema de gestão de tarefas**

| Campo   | Tipo           | Restrições  | Valor default |
| ------- | -------------- | ----------- | ------------- |
| Usuário | Caixa de texto | Obrigatório | —             |
| Senha   | Caixa de texto | Obrigatório | —             |


| Comando | Destino                         | Tipo    |
| ------- | ------------------------------- | ------- |
| Acessar | Atividade 2 – Criar nova tarefa | Default |


**2 – Criar nova tarefa e definir responsável, prazo e prioridade**

| Campo               | Tipo           | Restrições                          | Valor default |
| ------------------- | -------------- | ----------------------------------- | ------------- |
| Título da tarefa    | Caixa de texto | Obrigatório                         | —             |
| Descrição da tarefa | Área de texto  | Obrigatório                         | —             |
| Responsável         | Seleção única  | Obrigatório; lista de colaboradores | —             |
| Prazo               | Data           | Obrigatório                         | —             |
| Prioridade          | Seleção única  | Obrigatório; baixa, média, alta     | Média         |

| Comando      | Destino                                     | Tipo    |
| ------------ | ------------------------------------------- | ------- |
| Criar tarefa | Atividade 3 – Enviar notificação automática | Default |
| Cancelar     | Fim do processo                             | Cancel  |

**3– Enviar notificação automática ao colaborador**
| Campo        | Tipo           | Restrições             | Valor default         |
| ------------ | -------------- | ---------------------- | --------------------- |
| Destinatário | Caixa de texto | E-mail do colaborador  | Automático            |
| Assunto      | Caixa de texto | Texto padrão           | Nova tarefa atribuída |
| Mensagem     | Área de texto  | Gerada automaticamente | Automático            |


**4 – Receber notificação automática do sistema Responsável: Colaborador (Evento de recebimento, sem formulário)**

**5 – Visualizar tarefa atribuída**

| Campo            | Tipo           | Restrições      | Valor default |
| ---------------- | -------------- | --------------- | ------------- |
| Título da tarefa | Caixa de texto | Somente leitura | —             |
| Descrição        | Área de texto  | Somente leitura | —             |
| Prazo            | Data           | Somente leitura | —             |
| Prioridade       | Caixa de texto | Somente leitura | —             |

**6 – Atualizar status da tarefa**

| Campo            | Tipo          | Restrições                             | Valor default |
| ---------------- | ------------- | -------------------------------------- | ------------- |
| Status da tarefa | Seleção única | Obrigatório; em andamento ou concluída | Em andamento  |
| Observações      | Área de texto | Opcional                               | —             |

| Comando            | Destino                                       | Tipo    |
| ------------------ | --------------------------------------------- | ------- |
| Salvar atualização | Atividade 7 – Registrar histórico e progresso | Default |

**7 – Registrar histórico e progresso da tarefa em tempo real Responsável: Sistema (Atividade automática conforme atualização do colaborador)**

**8– Monitorar progresso da tarefa pelo painel do sistema Responsável: Gestor (Visualização contínua no painel)**

**Atividade 9 – Verificar se a tarefa foi concluída Tipo: Gateway exclusivo**

**10 – Visualizar conclusão da tarefa e registrar no relatório**

| Campo        | Tipo           | Restrições      | Valor default |
| ------------ | -------------- | --------------- | ------------- |
| Status final | Caixa de texto | Somente leitura | Concluída     |
| Comentários  | Área de texto  | Opcional        | —             |


**11 – Emitir alerta automático de atraso Responsável: Sistema**

**12 – Receber alerta automático de atraso Responsável: Gestor**

**13 – Analisar métricas e relatórios de desempenho**

| Campo              | Tipo               | Restrições      | Valor default |
| ------------------ | ------------------ | --------------- | ------------- |
| Período de análise | Intervalo de datas | Obrigatório     | Mês atual     |
| Indicadores        | Lista              | Somente leitura | —             |


**14 – Gerar relatórios e indicadores de desempenho Responsável: Sistema**

**15 – Concluir tarefa**

| Campo                    | Tipo     | Restrições  | Valor default |
| ------------------------ | -------- | ----------- | ------------- |
| Confirmação de conclusão | Checkbox | Obrigatório | Marcado       |

| Comando         | Destino         | Tipo    |
| --------------- | --------------- | ------- |
| Concluir tarefa | Fim do processo | Default |

