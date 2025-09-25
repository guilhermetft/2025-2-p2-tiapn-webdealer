# Especificação do projeto

<span style="color:red">Pré-requisitos: <a href="01-Contexto.md"> Documentação de contexto</a></span>

Esta seção apresenta a definição do problema e a proposta de solução sob a perspectiva do usuário, utilizando técnicas de modelagem que permitam compreender e detalhar as necessidades do negócio e as funcionalidades esperadas do sistema.  

Nesta seção são apresentadas as personas, histórias de usuários, requisitos funcionais e não funcionais, bem como as restrições do projeto. Também são descritas as ferramentas e metodologias empregadas para elaborar essas especificações, garantindo que todos os participantes possuam uma compreensão unificada do escopo, dos objetivos e das prioridades do trabalho.

## Modelo de negócio (*Business Model Canvas*)

O *Business Model Canvas* (BMC) é uma ferramenta de planejamento estratégico que descreve, de forma visual e integrada, como uma organização cria, entrega e captura valor.  

No contexto deste projeto, o BMC auxilia no alinhamento da equipe em relação aos aspectos essenciais do negócio, servindo como base para decisões técnicas, de design e de priorização de funcionalidades.  

![Quadro de modelo de negócios]
<img width="3833" height="2359" alt="Untitled" src="https://github.com/user-attachments/assets/7998c70c-b79f-447a-ad71-5623034af7a0" />



## Personas




**PERSONA 1**: Cecília Alves, 17 anos, é estudante do ensino médio técnico em informática e desenvolveu um protótipo de aplicativo para divulgar exposições artísticas em sua cidade. Apaixonada por arte e tecnologia, ela deseja levar o projeto adiante, mas enfrenta falta de reconhecimento e dificuldade em atrair investidores. Busca uma plataforma que divulgue seus trabalhos e sirva de inspiração para novas ideias.

**PERSONA 2**: Cláudio Marques, 48 anos, é gerente de uma software house e entusiasta de tecnologia. Busca constantemente novas formas de otimizar sua empresa e conhecer projetos inovadores. Enfrenta dificuldade em acompanhar novidades da área de TI e encontrar talentos qualificados. Deseja uma plataforma que facilite o networking, a descoberta de projetos e a conexão com possíveis novos colaboradores.

**PERSONA 3**: Paulo Antônio, 22 anos, é estudante de Engenharia de Software e sócio de uma startup focada em transporte urbano. Apesar de já ter um projeto em andamento, enfrenta dificuldade para encontrar investidores, tem pouca experiência no mercado e carece de networking. Seu objetivo é atrair investimentos e consolidar sua startup no mercado.

**PERSONA 4**: Ricardo Quintana, 40 anos, é CEO de uma empresa de investimentos e busca constantemente oportunidades inovadoras e seguras para investir. Além dos negócios, também se interessa em apoiar projetos que tragam retorno financeiro ou impacto positivo para a comunidade. Sente falta de uma rede acessível e diversificada de projetos para investir.

**PERSONA 5**: Francisco Gonçalves, 27 anos, é assistente de escritório e entusiasta de tecnologia. Gosta de explorar como soluções tecnológicas podem resolver problemas do dia a dia, mas sente falta de um espaço acessível para conhecer projetos criativos. Busca acompanhar novas ideias e se inspirar com soluções de impacto social e coletivo.

**PERSONA 6**: Karina Freitas, 35 anos, é professora universitária de TI e busca formas de dar visibilidade a ideias e protótipos de seus alunos. Sente que muitos projetos ficam restritos ao ambiente acadêmico e não recebem o devido reconhecimento. Deseja um espaço onde essas ideias possam ser divulgadas, gerando networking e atraindo investimentos sérios.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Estudante           |  Trazer mais reconhecimento para meu projeto         | Atrair possíveis investidores e divulgações, além de inspirar pessoas             |
|Gerente de empresa      | Conhecer projetos inovadores e fazer networking com novas pessoas                 | Me inspirar em melhorias e gerar novos empregos |
|Sócio de uma startup      | Buscar e conectar com possíveis investidores                 | Meu projeto evoluir e se consolidar no mercado de trabalho |
|Investidor       | Reconhecer projetos passíveis de investimento com segurança                 | Poder gerar lucros |
|Entusiasta de tecnologia       | Conhecer novas propostas de inovação aplicadas ao cotidiano                 | Me inspirar e aplicá-las no meu dia a dia |
|Professora universitária       | Divulgar propostas de projetos inovadores e interessantes                 | Realizar networking e atrair reconhecimento e investidores para as ideias |



## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário crie sua conta | ALTA | 
|RF-002| Permitir que o usuário cadastre projetos | ALTA | 
|RF-003| Permitir que o projeto seja editável | MÉDIA |
|RF-004| Pesquisa de projetos por nome | MÉDIA |
|RF-005| Criação de categorias para filtrar pesquisas | BAIXA |                 
|RF-006| Sistema de avaliação de projetos | BAIXA |                 
|RF-007| Criação e modificação de perfil | ALTA |                 
|RF-008| Exibição dos projetos | ALTA |    
|RF-006| Meio de comunicação entre investidor e inovador| ALTA |

### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| O sistema deve seguir boas práticas de acessibilidade | BAIXA | 
|RNF-003| O sistema deve estar no ar no minímo 90% do tempo | ALTA | 
|RNF-004| O código deve estar relativamente comentado para fácil manutenção | ALTA | 
|RNF-005| O sistema deve ser multiplataforma | ALTA | 
|RNF-006| Banco de dados integrado | ALTA | 

## Restrições

Enumere as restrições à sua solução. Lembre-se de que as restrições geralmente limitam a solução candidata.

O projeto está restrito aos itens apresentados na tabela a seguir.

|ID| Restrição                                             |
|--|-------------------------------------------------------|
|001| O projeto deverá ser entregue até o final do semestre |
|002| O custo total do projeto não deve exceder o orçamento definido |
|003| O projeto ainda não possui um sistema anti plágio |
|004| O Software é designado somente para a aréa tecnologica |
