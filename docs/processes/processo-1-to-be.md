### Processo 1 TO BE – Gestão de Projetos.

A solução proposta centraliza todo o processo de gestão de projetos em uma plataforma web integrada, permitindo o acompanhamento completo desde a criação até a avaliação final. O gestor inicia o processo com a validação e cadastro do projeto, incluindo suas especificações e a equipe responsável. A partir desse momento, o andamento das atividades é registrado automaticamente no sistema, permitindo que colaboradores atualizem o progresso em tempo real. 

O acompanhamento é feito diretamente pela plataforma, eliminando a necessidade de planilhas e comunicações dispersas. A geração automática de dashboards e relatórios oferece uma visão consolidada do desempenho dos projetos, facilitando o monitoramento de prazos, custos e resultados. Ao final, o gestor realiza a avaliação do projeto pela própria interface, podendo solicitar revisões ou aprovar sua conclusão de forma estruturada e rastreável.
 
<img width="1423" height="653" alt="Gestão de Projetos - TO BE Diagrama" src="https://github.com/user-attachments/assets/9ee69236-0672-4ac5-bd30-55251c587711" />


#### Detalhamento das atividades

_Descreva aqui cada uma das propriedades das atividades do processo 1. 
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


**1 – Cadastrar projeto e suas especificações na plataforma**

| Campo                    | Tipo           | Restrições                                 | Valor default |
| ------------------------ | -------------- | ------------------------------------------ | ------------- |
| Nome do projeto          | Caixa de texto | Obrigatório                                | —             |
| Descrição do projeto     | Área de texto  | Obrigatório                                | —             |
| Objetivos do projeto     | Área de texto  | Obrigatório                                | —             |
| Prazo estimado           | Data           | Obrigatório                                | —             |
| Responsável pelo projeto | Seleção única  | Obrigatório; Lista de usuários cadastrados | —             |
          |

| Comando        | Destino                            | Tipo    |
| -------------- | ---------------------------------- | ------- |
| Salvar projeto | Cadastro da equipe responsável     | default |
| Cancelar       | Encerramento da criação do projeto | —       |


**2 – Cadastrar equipe responsável e suas especificações**

| Campo                  | Tipo           | Restrições                        | Valor default |
| ---------------------- | -------------- | --------------------------------- | ------------- |
| Nome do membro         | Seleção única  | Obrigatório; Usuários cadastrados | —             |
| Função no projeto      | Caixa de texto | Obrigatório                       | —             |
| Carga horária estimada | Número         | Obrigatório                       | —             |
| Observações            | Área de texto  | Opcional                          | —             |

| Comando          | Destino                                          | Tipo    |
| ---------------- | ------------------------------------------------ | ------- |
| Confirmar equipe | Início e acompanhamento do projeto na plataforma | default |
| Editar equipe    | Permanecer na mesma tela                         | —       |


**3 – Acompanhar andamento do projeto pela plataforma**

| Campo                     | Tipo          | Restrições                                | Valor default |
| ------------------------- | ------------- | ----------------------------------------- | ------------- |
| Status do projeto         | Seleção única | Opções: Em andamento, Atrasado, Concluído | Em andamento  |
| Percentual de conclusão   | Número        | 0 a 100                                   | 0             |
| Atualizações do projeto   | Área de texto | Obrigatório                               | —             |
| Indicadores de desempenho | Automático    | Gerado pelo sistema                       | —             |

| Comando               | Destino                              | Tipo    |
| --------------------- | ------------------------------------ | ------- |
| Atualizar progresso   | Geração de dashboards e relatórios   | default |
| Registrar atualização | Permanecer na tela de acompanhamento | —       |



**4 – Avaliar e finalizar o projeto**

| Campo                   | Tipo          | Restrições                               | Valor default |
| ----------------------- | ------------- | ---------------------------------------- | ------------- |
| Resultado do projeto    | Seleção única | Obrigatório; Opções: Aprovado, Reprovado | —             |
| Parecer final do gestor | Área de texto | Obrigatório                              | —             |
| Relatórios consolidados | Automático    | Gerados pelo sistema                     | —             |

| Comando           | Destino                            | Tipo    |
| ----------------- | ---------------------------------- | ------- |
| Finalizar projeto | Fim do processo (Projeto aprovado) | default |
| Solicitar revisão | Revisão do projeto                 | —       |
