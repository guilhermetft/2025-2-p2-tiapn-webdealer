# Modelagem dos processos de negócio

<span style="color:red">Pré-requisitos: <a href="02-Especificacao.md"> Especificação do projeto</a></span>

> **Links úteis**:
> - [Modelagem de processos AS-IS x TO-BE](https://dheka.com.br/modelagem-as-is-to-be/)
> - [20 dicas práticas de modelagem de processos](https://dheka.com.br/20-dicas-praticas-de-modelagem-de-processos/)

Com o tema do projeto definido, escolham dois processos no contexto de negócios do cliente. Para ilustrar os potenciais ganhos com a automatização, imaginem processos manuais, ineficientes e/ou com muitas idas e vindas, gerando, assim, retrabalho. 

## Modelagem da situação atual (Modelagem AS IS)

Atualmente, os processos críticos de interação com stakeholders externos, como o recrutamento de novos talentos e o suporte ao cliente, são executados de forma manual e descentralizada. A comunicação depende excessivamente de canais não estruturados, como e-mails e aplicativos de mensagem, o que leva à perda de informações e à falta de padronização. As solicitações, sejam elas a abertura de uma vaga ou o reporte de um problema, são tratadas caso a caso, sem um fluxo de trabalho definido, resultando em triagens manuais lentas, encaminhamentos incorretos entre setores e uma significativa ineficiência operacional que gera retrabalho e atrasos.

AS IS - Captação de funcionários
 <img width="1495" height="1297" alt="AS IS – Captação de Funcionários (Diagrama elaborado na ferramenta BPMN)" src="https://github.com/user-attachments/assets/d7a90012-ef5e-48d2-9a88-db7049ac86dd" />



 AS IS - Abertura de chamados
  <img width="1668" height="780" alt="Abertura de chamados (AS-IS) Diagrama" src="https://github.com/user-attachments/assets/b683a307-f2ac-49f3-ae42-f42be34ccb98" />



## Descrição geral da proposta (Modelagem TO BE)

A proposta consiste na implementação de uma plataforma digital integrada para centralizar e automatizar os processos de recrutamento e atendimento. A solução visa substituir os fluxos manuais por um sistema inteligente que organiza as solicitações desde sua origem, seja de um candidato ou de um cliente. Através de portais dedicados, o sistema realizará uma triagem e um direcionamento automático das demandas, garantindo que elas cheguem às equipes corretas de forma instantânea e estruturada. Com isso, busca-se eliminar gargalos, reduzir o tempo de resposta e otimizar a alocação de recursos, transformando a experiência tanto dos colaboradores quanto do público externo.

TO BE - Captação de funcionários
<img width="1111" height="1461" alt="Diagrama TIAPN(WeabDealer) P2 Diagrama" src="https://github.com/user-attachments/assets/9d88d882-d243-41a8-8562-d66a4b8e23c5" />

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
