# Modelagem dos processos de negócio

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, os processos de gestão de projetos e acompanhamento de tarefas na empresa Arquivar são executados de forma manual, descentralizada e sem padronização, com uso de planilhas e comunicação informal por e-mails ou mensagens. Essa falta de integração gera retrabalho, dificuldade de controle sobre prazos e responsabilidades, além de tornar a consolidação das informações lenta e suscetível a erros. A ausência de um sistema unificado compromete a visibilidade do andamento das atividades, dificulta a colaboração entre equipes e impede a geração de métricas confiáveis para análise de desempenho e apoio à tomada de decisão.

AS IS - Gestão de Projetos
<img width="1463" height="677" alt="Gestão de Projetos - AS IS Diagrama" src="https://github.com/user-attachments/assets/8b87ae0a-4157-4f3d-a076-fa89fd8f6b6d" />


 AS IS - Acompanhamento de Tarefas
<img width="1942" height="733" alt="Acompanhamento de Tarefas - AS IS Diagrama" src="https://github.com/user-attachments/assets/7f588c0f-24c9-491e-b625-807997e11413" />


## Descrição geral da proposta (Modelagem TO BE)

A proposta consiste na centralização e padronização da gestão de projetos e o acompanhamento de tarefas por meio de plataformas integradas, permitindo que gestores e colaboradores acompanhem atividades em tempo real, reduzam retrabalho e falhas de comunicação, e tenham visibilidade completa sobre prazos, responsabilidades e desempenho. Com notificações automáticas, dashboards e relatórios consolidados, o sistema oferece métricas confiáveis que suportam a tomada de decisão estratégica, promovendo maior eficiência, transparência e colaboração entre equipes, ao mesmo tempo em que facilita o controle e a organização de projetos e tarefas.

TO BE - Gestão de Projetos
<img width="1423" height="653" alt="Gestão de Projetos - TO BE Diagrama" src="https://github.com/user-attachments/assets/e9d926bc-17da-4818-927c-cc4f296e1ce7" />



TO BE - Acompanhamento de Tarefas
<img width="1670" height="1358" alt="Acompanhamento de Tarefas - TO BE Diagrama" src="https://github.com/user-attachments/assets/aef8c2c3-3166-4429-bac5-8f95ee9f6154" />


#### Descrição de Proposta e Limites
A introdução desta plataforma integrada de gestão de projetos e acompanhamento de tarefas é uma iniciativa estratégica para elevar a eficiência operacional da empresa. Ao centralizar informações, automatizar notificações e gerar dashboards e relatórios consolidados, a solução libera gestores e colaboradores para se concentrarem em atividades de maior valor, como tomada de decisão estratégica, análise de desempenho e otimização de processos. Esta otimização está diretamente alinhada aos objetivos de negócio de aumentar a produtividade, melhorar a comunicação entre equipes, garantir transparência nos fluxos internos e promover uma gestão de projetos escalável e confiável.

Contudo, a tecnologia é uma ferramenta de suporte e seus limites residem na dependência do fator humano para a adesão, atualização e uso correto do sistema, além da necessidade de infraestrutura tecnológica adequada e capacitação dos usuários. O sucesso da implementação depende de uma boa gestão da mudança e do entendimento de que a plataforma otimiza processos, mas não substitui a análise e o julgamento estratégico que só podem ser realizados por profissionais qualificados.

## Modelagem dos processos

[PROCESSO 1 AS IS - Gestão de Projetos](./processes/processo-1-as-is.md "Detalhamento do processo 1 AS IS.")

[PROCESSO 1 TO BE - Gestão de Projetos](./processes/processo-1-to-be.md "Detalhamento do processo 1 TO BE.")

[PROCESSO 2 AS IS - Acompanhamento de Tarefas](./processes/processo-2-as-is.md "Detalhamento do processo 2 AS IS.")

[PROCESSO 2 TO BE - Acompanhamento de Tarefas](./processes/processo-2-to-be.md "Detalhamento do processo 2 TO BE.")

## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Taxa de Conclusão de Projetos no Prazo | Medir a eficiência do time na entrega dos projetos dentro dos prazos estabelecidos. | Calcula a proporção de projetos finalizados até a data limite definida. | Data de início e término dos projetos. | (Projetos concluídos no prazo ÷ Total de projetos concluídos) × 100 |
| Cumprimento de Prazos de Tarefas | Avaliar a pontualidade dos colaboradores no cumprimento das tarefas. | Mede a porcentagem de tarefas concluídas dentro do prazo planejado. | Data de criação e data de conclusão das tarefas. | (Tarefas concluídas no prazo ÷ Total de tarefas concluídas) × 100 |
| Tempo Médio de Execução de Tarefas | Identificar gargalos no fluxo operacional e otimizar a produtividade. | Calcula o tempo médio gasto entre a criação e a conclusão de cada tarefa. | Histórico de tarefas (datas de início e conclusão). | (Data de conclusão - Data de início) ÷ Total de tarefas |
| Taxa de Retrabalho | Monitorar a qualidade das entregas e a clareza das instruções. | Mede quantas tarefas precisam ser reabertas ou corrigidas após concluídas. | Status das tarefas e histórico de alterações. | (Tarefas reabertas ÷ Total de tarefas concluídas) × 100 |
| Índice de Atrasos | Controlar a frequência de atrasos nas entregas de tarefas e projetos. | Mostra o percentual de tarefas ou projetos entregues após o prazo final. | Registro de prazos e conclusões. | (Tarefas/projetos atrasados ÷ Total de tarefas/projetos) × 100 |

Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
