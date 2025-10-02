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




**PERSONA 1**: Cecília Alves, 17 anos, estudante do ensino médio técnico em Informática, criou um protótipo de aplicativo para divulgar exposições artísticas locais. Apaixonada por arte e tecnologia, deseja expandir o projeto, mas enfrenta falta de reconhecimento e dificuldade para atrair investidores. Busca uma plataforma que valorize seus trabalhos e inspire novas ideias.

**PERSONA 2**: Cláudio Marques, 48 anos, gerente de uma software house e entusiasta de tecnologia, busca constantemente formas de otimizar sua empresa e conhecer projetos inovadores. Enfrenta dificuldade em acompanhar as novidades de TI e em encontrar talentos qualificados. Deseja uma plataforma que facilite o networking, a descoberta de projetos e a conexão com potenciais colaboradores.

**PERSONA 3**: Paulo Antônio, 22 anos, estudante de Engenharia de Software e sócio de uma startup de transporte urbano. Apesar de já ter um projeto em andamento, enfrenta dificuldade para encontrar investidores, possui pouca experiência de mercado e carece de networking. Busca atrair investimentos e consolidar sua startup.

**PERSONA 4**: Ricardo Quintana, 40 anos, CEO de uma empresa de investimentos, busca constantemente oportunidades inovadoras e seguras. Além do retorno financeiro, interessa-se por projetos com impacto positivo na comunidade. Sente falta de uma rede acessível e diversificada de opções para investir.

**PERSONA 5**: Francisco Gonçalves, 27 anos, assistente de escritório e entusiasta de tecnologia. Gosta de explorar como soluções tecnológicas podem resolver problemas do dia a dia, mas sente falta de um espaço acessível para conhecer projetos criativos. Busca acompanhar novas ideias e se inspirar em soluções de impacto social e coletivo.

**PERSONA 6**: Karina Freitas, 35 anos, professora universitária de TI, busca dar visibilidade às ideias e protótipos de seus alunos. Acredita que muitos projetos ficam restritos ao ambiente acadêmico e sem reconhecimento. Deseja um espaço para divulgar essas iniciativas, gerar networking e atrair investimentos.

## Histórias de usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuários:

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|--------------------|------------------------------------|----------------------------------------|
|Estudante           |  Obter maior reconhecimento para o projeto         | Atrair possíveis investidores e divulgações, além de inspirar pessoas             |
|Gerente de empresa      | Conhecer projetos inovadores e fazer networking com novas pessoas                 | Inspirar-se em melhorias e gerar novos empregos |
|Sócio de uma startup      | Buscar e conectar com possíveis investidores                 | Que o projeto evolua e se consolide no mercado de trabalho |
|Investidor       | Reconhecer projetos passíveis de investimento com segurança                 | Gerar retorno financeiro |
|Entusiasta de tecnologia       | Conhecer novas propostas de inovação aplicadas ao cotidiano                 | Inspirar-se e aplicá-las no cotidiano |
|Professora universitária       | Divulgar propostas de projetos inovadores e interessantes                 | Promover networking e atrair reconhecimento e investidores para os projetos |



## Requisitos

As tabelas a seguir apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto. Para determinar a prioridade dos requisitos, aplique uma técnica de priorização e detalhe como essa técnica foi aplicada.

### Requisitos funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| Permitir que o usuário crie sua conta | ALTA | 
|RF-002| Permitir que o usuário cadastre projetos | ALTA | 
|RF-003| Permitir que o projeto seja editável | MÉDIA |
|RF-004| Permitir pesquisa de projetos por nome | MÉDIA |
|RF-005| Criar categorias para filtrar pesquisas | BAIXA |                 
|RF-006| Criar sistema de avaliação de projetos | BAIXA |                 
|RF-007| Criar e modificar perfil de usuário | ALTA |                 
|RF-008| Exibir projetos cadastrados | ALTA |    
|RF-009| Disponibilizar meio de comunicação entre investidor e inovador | ALTA |

---
### Requisitos não funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-001| O sistema deve ser responsivo para rodar em dispositivos móveis | MÉDIA | 
|RNF-002| O sistema deve seguir boas práticas de acessibilidade | BAIXA | 
|RNF-003| O sistema deve estar disponível no mínimo 90% do tempo | ALTA | 
|RNF-004| O código deve ser comentado para facilitar a manutenção | ALTA | 
|RNF-005| O sistema deve ser multiplataforma | ALTA | 
|RNF-006| O sistema deve possuir banco de dados integrado | ALTA | 

---
## Restrições

As restrições definem os limites e condições que devem ser respeitados no desenvolvimento do projeto. A tabela a seguir apresenta as principais restrições identificadas:

|ID  | Restrição                                                                 |
|----|---------------------------------------------------------------------------|
|001 | O projeto deverá ser concluído e entregue até o final do semestre letivo. |
|002 | O custo total do projeto não poderá ultrapassar o orçamento previamente definido. |
|003 | A primeira versão do projeto não contemplará um sistema antiplágio. |
|004 | O software será destinado exclusivamente a aplicações voltadas para a área tecnológica. |

