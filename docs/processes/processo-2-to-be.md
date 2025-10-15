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

**Detecção de problema/dúvida do cliente**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| |   |                |                   |
|       Descrever situação     | Área de Texto   | Obrigatório |                |
| Anexar arquivos           | Arquivos   | Mais de um campo para anexos |           |
|       Selecionar setor    |  Seleção única  | Obrigatório; Lista de setores da empresa |           |
|       Selecionar natureza    |  Seleção única  | Obrigatório; Lista pré-estabelecida |           |

| **Comandos**         |  **Destino**                   | **Tipo** |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
| Enviar              |        Fim da abertura do protocolo       | default           |


**Abertura do protocolo na Arquivar**

| **Campo**       | **Tipo**         | **Restrições** | **Valor default** |
| ---             | ---              | ---            | ---               |
| Número do protocolo | Número  |                |                   |
|         Status do protocolo        |         Caixa de texto         |                |                   |

| **Comandos**         |  **Destino**                   | **Tipo**          |
| ---                  | ---                            | ---               |
| [Nome do botão/link] | Atividade/processo de destino  | (default/cancel/  ) |
|            Enviar resultados          |       Retorno ao cliente                   |         Default          |
