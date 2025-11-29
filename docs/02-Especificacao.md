# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Esta seção apresenta a definição do problema e a proposta de solução sob a perspectiva do usuário, utilizando técnicas de modelagem que permitam compreender e detalhar as necessidades do negócio e as funcionalidades esperadas do sistema.  

Nesta seção são apresentadas as personas, histórias de usuários, requisitos funcionais e não funcionais, bem como as restrições do projeto. Também são descritas as ferramentas e metodologias empregadas para elaborar essas especificações, garantindo que todos os participantes possuam uma compreensão unificada do escopo, dos objetivos e das prioridades do trabalho.

## Modelo de negócio (*Business Model Canvas*)

O *Business Model Canvas* (BMC) é uma ferramenta de planejamento estratégico que descreve, de forma visual e integrada, como uma organização cria, entrega e captura valor.  

No contexto deste projeto, o BMC auxilia no alinhamento da equipe em relação aos aspectos essenciais do negócio, servindo como base para decisões técnicas, de design e de priorização de funcionalidades.  

**Quadro de modelo de negócios**
<img width="3833" height="2359" alt="BMC Novo" src="https://github.com/user-attachments/assets/c0ee847a-74c5-4627-a88b-134876689770" />

## Personas

**PERSONA 1**: Ana Beatriz, 28 anos, analista de projetos em uma empresa de médio porte. Ana precisa acompanhar múltiplos projetos simultaneamente e sente dificuldade em consolidar informações de diferentes equipes. Busca uma ferramenta que permita monitorar prazos, responsabilidades e progresso das tarefas em um único ambiente.

**PERSONA 2**: Carlos Eduardo, 42 anos, gerente de TI em uma grande organização. Carlos precisa garantir que os projetos da empresa sejam executados dentro do prazo e do orçamento. Enfrenta dificuldades para visualizar indicadores de desempenho e identificar gargalos. Deseja uma plataforma que ofereça dashboards e relatórios gerenciais confiáveis.

**PERSONA 3**: Mariana Lopes, 24 anos, colaboradora recém-contratada de uma empresa de tecnologia. Mariana precisa se adaptar rapidamente aos processos internos e acompanhar suas tarefas diárias. Busca uma aplicação que seja intuitiva, centralize informações importantes e facilite a comunicação com outros membros da equipe.

**PERSONA 4**: Rafael Torres, 38 anos, diretor de operações de uma multinacional. Rafael precisa ter uma visão estratégica do andamento de todos os projetos da empresa para tomar decisões assertivas. Enfrenta desafios em obter informações consolidadas e atualizadas em tempo real.

**PERSONA 5**: Juliana Martins, 30 anos, coordenadora de planejamento e controle de uma empresa de serviços. Juliana é responsável por monitorar indicadores de produtividade e eficiência, mas sente dificuldade em conectar dados de diferentes setores e gerar relatórios consistentes. Busca uma ferramenta que facilite o planejamento e a gestão integrada de projetos.

**PERSONA 6**: Eduardo Silva, 35 anos, administrador de processos internos. Eduardo precisa garantir que equipes cumpram suas responsabilidades e que os processos sejam seguidos corretamente. Ele deseja uma aplicação que centralize informações, organize tarefas e facilite a comunicação entre departamentos, promovendo mais transparência e eficiência.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
| Analista de Projetos | Acompanhar o progresso de múltiplos projetos em tempo real | Garantir que minhas tarefas e as de minhas equipes sejam concluídas dentro do prazo e com qualidade             |
| Gerente de TI | Acessar dashboards e relatórios consolidados de projetos | Identificar gargalos, monitorar indicadores de desempenho e tomar decisões estratégicas |
| Colaboradora | Interface intuitiva para consultar minhas tarefas e atualizar status de atividades | Me adaptar rapidamente aos processos internos e manter a comunicação com a equipe |
| Diretor de operações | Visualizar o andamento de todos os projetos da empresa em um painel centralizado | Tomar decisões estratégicas com informações confiáveis e em tempo real |
| Coordenadora de planejamento | Gerar relatórios e indicadores integrados dos projetos | Avaliar produtividade, eficiência e alinhar processos entre setores |
| Administrador de processos | Centralizar tarefas e responsabilidades das equipes | Garantir que processos sejam seguidos corretamente, promovendo mais transparência e eficiência |
| Designer Freelancer | Organizar tarefas e prazos de diferentes clientes em um só ambiente | Manter controle sobre entregas e melhorar a comunicação com os contratantes |
| Cliente Corporativa | Acompanhar o progresso das entregas de projetos contratados | Ter mais transparência, confiança e controle sobre prazos e resultados |
| Desenvolvedor Júnior | Visualizar minhas tarefas em um sistema organizado (como um quadro Kanban) | Compreender prioridades e aprender o fluxo de trabalho da equipe |
| Gerente de Produto | Integrar dados de diferentes equipes em um painel de métricas unificado | Alinhar as entregas às metas estratégicas e acompanhar indicadores de progresso |

## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Cadastro, edição e exclusão de projetos | ALTA | 
|RF-002| Cadastro e Login de Usuario | ALTA |
|RF-003| Registro e acompanhamento de tarefas com responsáveis, prazos e status | ALTA | 
|RF-004| Dashboards interativos com indicadores de desempenho e progresso | ALTA |
|RF-005| Níveis de acesso diferenciados para administradores, gestores e colaboradores | ALTA |
|RF-006| Disponibilizar uma visualização em Kanban para gerenciar o fluxo de tarefas por status | ALTA |
|RF-007| Implementar autenticação de usuários com login e senha, garantindo acesso seguro | ALTA |
|RF-008| Permitir o anexo de arquivos (documentos, imagens ou planilhas) às tarefas e projetos | MÉDIA |
|RF-009| Exibir um histórico de alterações em projetos e tarefas, indicando quem fez cada modificação | MÉDIA |
|RF-0010| Emissão de relatórios gerenciais | MÉDIA |                 
|RF-011| Busca e filtragem de projetos e tarefas | MÉDIA |                 
|RF-012| Notificações automáticas sobre prazos, atualizações e mudanças de status | MÉDIA |                 
|RF-013| Comentários e comunicação interna entre membros da equipe | BAIXA |    
|RF-014| Exportação de dados em formatos padrão (PDF/Excel) | BAIXA |

---
### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| Responsividade (desktop, tablet e smartphone) | ALTA | 
|RNF-002| Segurança de dados e autenticação por função | ALTA | 
|RNF-003| Intuitivo e fácil de usar | ALTA | 
|RNF-004| Tempo de resposta rápido (dashboards e relatórios) | MÉDIA | 
|RNF-005| Alta disponibilidade (uptime ≥ 99%) e backup automático | MÉDIA | 
|RNF-006| Escalabilidade para suportar aumento de usuários e projetos | MÉDIA | 

---
## Restrições

As restrições definem os limites e condições que devem ser respeitados no desenvolvimento do projeto. A tabela a seguir apresenta as principais restrições identificadas:

|ID  | Restrição                                                                 |
|----|---------------------------------------------------------------------------|
|001 | O projeto deverá ser concluído e entregue até o final do semestre letivo |
|002 | Ser desenvolvido como aplicação web, acessível via navegador |
|003 | Compatível com processos internos e fluxos existentes na empresa |
