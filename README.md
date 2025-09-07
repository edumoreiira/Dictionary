# Dictionary

Um aplicativo de dicionário interativo e minimalista construído com Angular, que permite aos usuários pesquisar definições de palavras, sinônimos, antônimos e ouvir a pronúncia. O projeto consome a [Free Dictionary API](https://dictionaryapi.dev/) para obter os dados.

A interface foi projetada para ser limpa e amigável, com animações fluidas para uma experiência de usuário aprimorada, além de oferecer temas claro e escuro.

## 🚀 Acesso Rápido (Live Demo)

**Visualize o projeto em ação acessando o link do GitHub Pages:**

### **[https://edumoreiira.github.io/Dictionary/](https://edumoreiira.github.io/Dictionary/)**

## ✨ Funcionalidades

  - **Pesquisa de Palavras:** Busca de definições, fonética, sinônimos e antônimos.
  - **Pronúncia em Áudio:** Ouça a pronúncia correta das palavras.
  - **Múltiplas Definições:** Exibe diferentes significados e usos da palavra (verbo, substantivo, etc.).
  - **Fontes Selecionáveis:** Alterne entre fontes Serif, Sans-Serif e Mono para uma leitura mais agradável.
  - **Tema Claro e Escuro:** Adapte a interface para a sua preferência visual.
  - **Interface Responsiva:** Totalmente funcional em desktops e dispositivos móveis.
  - **Animações:** Animações sutis que tornam a navegação mais fluida e intuitiva.

## ⚙️ Tecnologias Utilizadas

  - **Angular 17**
  - **TypeScript**
  - **RxJS** para programação reativa
  - **SCSS** para estilização avançada
  - **Angular Animations** para uma experiência de usuário dinâmica

## 🛠️ Instalação e Execução

Siga os passos abaixo para executar o projeto localmente:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/edumoreiira/Dictionary.git
    ```

2.  **Navegue até o diretório do projeto:**

    ```bash
    cd Dictionary
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Execute o servidor de desenvolvimento:**

    ```bash
    ng serve
    ```

    Acesse `http://localhost:4200/` no seu navegador. A aplicação será recarregada automaticamente se você alterar qualquer um dos arquivos de origem.

## 🤝 Boas Práticas e Convenções

Este projeto foi desenvolvido com um foco em boas práticas de codificação e arquitetura, garantindo um código limpo, manutenível e performático. Abaixo estão alguns destaques:

### Angular & RxJS

  * **Controle de Fluxo de Dados com RxJS:** O estado da aplicação e as chamadas de API são gerenciados de forma reativa. O `dictionary$` é um `Observable` que, ao ser resolvido com o pipe `async` no template, garante que os dados sejam exibidos de forma reativa e eficiente.
  * **Gerenciamento de Cache Simples:** Foi implementado um cache em memória para as requisições à API. Antes de fazer uma nova chamada, o sistema verifica se a palavra já foi pesquisada, evitando requisições duplicadas e melhorando a performance.
  * **Cuidado ao Desinscrever-se de Observables:** Para evitar *memory leaks*, as inscrições (`Subscriptions`) em `Observables` são devidamente canceladas no ciclo de vida `ngOnDestroy` do componente. Essa prática é crucial para a saúde da aplicação, especialmente em cenários de navegação intensa.
  * **Uso de `take(1)`:** Em operações que precisam de apenas um valor emitido (como chamadas HTTP), o operador `take(1)` é utilizado para finalizar o `Observable` automaticamente após a primeira emissão, simplificando o gerenciamento de inscrições.
  * **Animações com `Angular Animations`:** As animações de entrada e saída de elementos são construídas com o sistema de animações do Angular, proporcionando uma experiência de usuário mais rica e controlada diretamente pelo estado dos componentes.

### TypeScript

  * **Tipagem Forte:** O projeto utiliza interfaces (como `Dictionary`, `Meanings`, `Phonetics`) para modelar a estrutura de dados recebida da API. Isso garante a segurança de tipos em todo o código, facilitando a manutenção e prevenindo erros em tempo de execução.
  * **Configuração `strict`:** O `tsconfig.json` está configurado com o modo `strict` habilitado, aplicando regras mais rigorosas de verificação de tipos e nulidade para um código mais robusto.

### HTML & CSS

  * **Tags HTML contendo acessibilidade, utilizando `aria attributes`:** Embora não estejam explicitamente visíveis em todos os elementos, a semântica HTML foi utilizada para garantir uma base acessível.
  * **SCSS e Variáveis CSS:** A estilização é feita com SCSS, aproveitando recursos como aninhamento e modularidade. O uso de variáveis CSS (`var(--bg-color)`, `var(--text-color)`) é fundamental para a implementação da funcionalidade de troca de temas (claro/escuro), permitindo a alteração dinâmica das cores da interface.
  * **Design Responsivo:** O layout foi construído pensando em diferentes tamanhos de tela, garantindo uma boa experiência tanto em dispositivos móveis quanto em desktops.
