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




**PERSONA 1**

Nome: Cecília Alves  
Idade: 17 anos  
Ocupação: Estudante do ensino médio  

Cecília é estudante do ensino médio integrado com curso técnico de informática e, como trabalho final do ano letivo, ela desenvolveu um protótipo de aplicativo que exibisse apresentações e exposições artísticas em sua cidade. Devido ao seu caráter prestativo, juntamente com sua paixão pelas artes, Cecília gostaria de levar esse projeto adiante, mas encontra dificuldades de encontrar não apenas investidores, mas reconhecimento para com sua ideia.

Dores:
- Sua ideia não possui o reconhecimento que ela gostaria que tivesse;
- Acredita que sua ideia “não é o bastante”, a ponto de ter investimentos de terceiros;

Objetivo:
 - Uma plataforma que servisse não apenas como divulgação de seus próprios protótipos, mas também um lugar em que ela pudesse se inspirar em novas ideias.




**PERSONA 2**

Nome: Cláudio Marques  
Idade: 48 anos  
Ocupação: Gerente de uma software house  

Cláudio, sendo gerente de uma empresa de tecnologia e entusiasta na área, está sempre antenado em maneiras de melhorar tanto as rotinas diárias de sua empresa, quanto ao desenvolvimento de seus produtos para seus clientes. Ele gostaria que tivesse algum site onde ele pudesse conhecer novos projetos e se conectar com novas pessoas, gerando novas contratações para sua empresa, por exemplo.

Dores: 
- Se sente “por fora” de projetos que surgem na área de TI;
- Dificuldade em encontrar novos talentos qualificados para suas empresas;

Objetivos:
- Conhecer novos projetos inovadores;
- Realizar networking com possíveis novos contratados para sua empresa.




**PERSONA 3**

Nome: Paulo Antônio  
Idade: 22 anos  
Ocupação: Estudante de Engenharia de Software, e sócio de uma startup  

Paulo Antônio, enquanto estava no último período da faculdade, começou a desenvolver a ideia de uma aplicação voltada para o transporte urbano. Com a união de alguns colegas do curso, a ideia foi inicializada e desenvolvida em uma startup recém criada, e agora Paulo está buscando possíveis investidores no mercado de trabalho para seu projeto.

Dores: 
- Tentativas sem sucesso de encontrar investidores para seu projeto;
- Inexperiência no mercado de trabalho;
- Ausência de networking em ambientes corporativos;

Objetivos: 
- Encontrar pessoas dispostas a investir em sua startup;
- Tornar sua startup relevante e sólida no mercado de trabalho.




**PERSONA 4**

Nome: Ricardo Quintana  
Idade: 40 anos  
Ocupação: CEO e empresário  

Ricardo é CEO de uma empresa de investimentos e está sempre em constante busca de oportunidades de projetos para confiar a ponto de investir no mesmo. Além dos investimentos realizados em sua profissão, Ricardo também gosta de investir de forma particular em projetos com propostas variadas, desde que esses investimentos possam gerar retornos financeiros ou para ele ou para a comunidade ao seu redor. 

Dores: 
- Poucas oportunidades de projetos disponíveis para investir;
- Sente falta de uma rede de “propagandas” de projetos;

Objetivos:
- Encontrar propostas de investimentos inovadores e diversificados;
- Ter segurança e facilidade para investir em inúmeros projetos.




**PERSONA 5**

Nome: Francisco Gonçalves  
Idade: 27 anos  
Ocupação: Assistente de escritório  

Como entusiasta na área, Francisco gosta sempre de se perguntar em como as tecnologias poderiam ser aplicadas para resolver questões e problemas variados não apenas presentes em sua vida, mas em situações cotidianas coletivas. Por isso, Francisco se interessaria por uma plataforma que pudesse exibir soluções tecnológicas e suas aplicações para problemas diversos.

Dores: 
- Desconhecimento em muitas soluções criativas;
- Falta de um espaço onde tenha soluções tecnológicas aplicadas em questões do cotidiano;

Objetivos:
- Acompanhar novos projetos e soluções tecnológicas de forma acessível;
- Se inspirar com ideias que tragam impacto social e melhorias para a vida coletiva.




**PERSONA 6**

Nome: Karina Freitas  
Idade: 35 anos  
Ocupação: Professora universitária   

Karina é professora universitária na área de TI, e por isso, está familiarizada com processos de criação e desenvolvimento de soluções aplicadas no âmbito tecnológico. Por valorizar propostas interessantes, Karina gostaria que existisse uma espécie de “catálogo de projetos”, onde seus alunos pudessem divulgar e compartilhar suas ideias e protótipos a quem interessar possa, trazendo apenas reconhecimento ou investimentos sérios.

Dores:
- Ver ideias interessantes servirem apenas como trabalho acadêmico, sem serem levadas à sério ou para frente;
- Divulgação fraca de ideias e projetos, ocorrendo apenas dentro do círculo da universidade;

Objetivos:
- Ajudar a estabelecer networking entre alunos e investidores;
- Compartilhar projetos interessantes e inovadores para a sociedade.



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
