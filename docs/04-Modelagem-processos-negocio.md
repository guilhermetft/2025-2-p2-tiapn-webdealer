# Modelagem dos processos de negócio

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, os processos de gestão de projetos e acompanhamento de tarefas na empresa Arquivar são executados de forma manual, descentralizada e sem padronização, com uso de planilhas e comunicação informal por e-mails ou mensagens. Essa falta de integração gera retrabalho, dificuldade de controle sobre prazos e responsabilidades, além de tornar a consolidação das informações lenta e suscetível a erros. A ausência de um sistema unificado compromete a visibilidade do andamento das atividades, dificulta a colaboração entre equipes e impede a geração de métricas confiáveis para análise de desempenho e apoio à tomada de decisão.

AS IS - Captação de funcionários
<img width="1463" height="677" alt="Gestão de Projetos - AS IS Diagrama" src="https://github.com/user-attachments/assets/8b87ae0a-4157-4f3d-a076-fa89fd8f6b6d" />


 AS IS - Acompanhamento de Tarefas
<img width="1942" height="733" alt="Acompanhamento de Tarefas - AS IS Diagrama" src="https://github.com/user-attachments/assets/7f588c0f-24c9-491e-b625-807997e11413" />


## Descrição geral da proposta (Modelagem TO BE)

A proposta consiste na implementação de uma plataforma digital integrada para centralizar e automatizar os processos de recrutamento e atendimento. A solução visa substituir os fluxos manuais por um sistema inteligente que organiza as solicitações desde sua origem, seja de um candidato ou de um cliente. Através de portais dedicados, o sistema realizará uma triagem e um direcionamento automático das demandas, garantindo que elas cheguem às equipes corretas de forma instantânea e estruturada. Com isso, busca-se eliminar gargalos, reduzir o tempo de resposta e otimizar a alocação de recursos, transformando a experiência tanto dos colaboradores quanto do público externo.

TO BE - Captação de funcionários
<img width="1111" height="1461" alt="Diagrama TIAPN(WeabDealer) P2 Diagrama" src="https://github.com/user-attachments/assets/9d88d882-d243-41a8-8562-d66a4b8e23c5" />


TO BE - Abertura de chamados
 <img width="1569" height="723" alt="Abertura de chamados (TO-BE) Diagrama" src="https://github.com/user-attachments/assets/11fe457d-c2eb-4183-b535-f6290441caa9" />


#### Descrição de Proposta e Limites
A introdução desta plataforma unificada é uma iniciativa estratégica para elevar a maturidade operacional da empresa. Ao automatizar tarefas repetitivas nos processos de recrutamento e suporte, a solução libera as equipes para se concentrarem em atividades de maior valor, como a análise estratégica de candidatos e a resolução de problemas complexos de clientes. Esta otimização está diretamente alinhada aos objetivos de negócio de aumentar a eficiência, fortalecer a marca (seja como empregadora ou prestadora de serviços) e promover um crescimento escalável.

Contudo, a tecnologia é uma ferramenta de suporte e seus limites residem na dependência do fator humano para a configuração, adoção e extração de valor, além dos custos de implementação e manutenção. O sucesso da implementação está condicionado a uma boa gestão da mudança e ao entendimento de que a automação otimiza, mas não substitui, a necessidade de julgamento humano qualificado nas etapas decisivas dos processos.

## Modelagem dos processos

[PROCESSO 1 AS IS - Recrutamento e Seleção de Candidatos](./processes/processo-1-as-is.md "Detalhamento do processo 1 AS IS.")

[PROCESSO 1 TO BE - Recrutamento e Seleção de Candidatos](./processes/processo-1-to-be.md "Detalhamento do processo 1 TO BE.")

[PROCESSO 2 AS IS - Atendimento e Suporte ao Cliente](./processes/processo-2-as-is.md "Detalhamento do processo 2 AS IS.")

[PROCESSO 2 TO BE - Atendimento e Suporte ao Cliente](./processes/processo-2-to-be.md "Detalhamento do processo 2 TO BE.")

## Indicadores de desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Coloque no mínimo 5 indicadores.

Use o seguinte modelo:

| **Indicador** | **Objetivos** | **Descrição** | **Fonte de dados** | **Fórmula de cálculo** |
| ---           | ---           | ---           | ---             | ---             |
| Percentual de reclamações | Avaliar quantitativamente as reclamações | Percentual de reclamações em relação ao total de atendimentos | Tabela Reclamações | número total de reclamações / número total de atendimentos |
| Taxa de requisições atendidas | Melhorar a prestação de serviços medindo a porcentagem de requisições atendidas| Mede a % de requisições atendidas na semana | Tabela Solicitações | (número de requisições atendidas / número total de requisições) * 100 |
| Taxa de entrega de material | Manter controle sobre os materiais que estão sendo entregues | Mede % de material entregue dentro do mês | Tabela Pedidos | (número de pedidos entregues / número total de pedidos) * 100 |


Obs.: todas as informações necessárias para gerar os indicadores devem estar no diagrama de classe a ser apresentado posteriormente.
