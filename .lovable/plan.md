# Plano — Estrutura funcional do site GETCARS

## Objetivo
Construir a primeira versão funcional da GETCARS com catálogo, detalhes dos veículos e fluxo de avaliação para venda, preservando a home como uma apresentação curta e elegante.

## Identidade e imagens
- Aplicar a estética de painel automotivo/HUD em fundo quase preto, superfícies escuras, linhas finas, detalhes dourados e bastante respiro.
- Usar Big Shoulders Display nos títulos, Manrope no corpo e JetBrains Mono nos dados técnicos.
- Incorporar a logo enviada como marca principal.
- Gerar fotografias automotivas coesas e realistas para:
  - Porsche 911 Carrera T;
  - Chevrolet Suburban High Country;
  - BMW 330e azul;
  - BMW preta vista pela traseira, usada exclusivamente como fundo da página Vender.
- Manter o Volkswagen Nivus GTS com o placeholder “Foto em breve”, sem reutilizar imagens.
- Não apresentar nas imagens ou textos características técnicas não fornecidas como informação do estoque.

## Estrutura compartilhada
- Criar cabeçalho fixo translúcido com logo, navegação para Veículos e Vender, contato via WhatsApp e menu móvel em tela cheia.
- Esconder o cabeçalho ao rolar para baixo e reapresentá-lo ao subir, respeitando redução de movimento.
- Criar rodapé com navegação, WhatsApp, Instagram, localização e copyright informados.
- Adicionar botão flutuante discreto do WhatsApp.
- Centralizar os links do WhatsApp em uma única função utilitária.
- Definir tokens semânticos globais para cores, tipografia, bordas e superfícies; nenhum valor visual solto nas páginas.

## Páginas

### Home `/`
- Exibir somente a logo centralizada, a frase “Veículos premium, exclusivos e blindados” e os botões “Ver veículos” e “Falar no WhatsApp”.
- Manter aparência refinada, sem transformar esta etapa na home final.

### Catálogo `/veiculos`
- Mostrar título, contador de resultados e os quatro veículos informados.
- Incluir filtros Todos, Esportivos, SUVs e Blindados, refletidos em `?cat=`.
- Incluir ordenação por ano e quilometragem.
- Usar grade adaptável e cartões com foto/placeholder, selo quando aplicável, marca, modelo, ano, km, preço sob consulta e acesso aos detalhes.
- Animar reordenação e interações sutis, com alternativa para redução de movimento.
- Incluir estados vazio e de carregamento.

### Detalhe `/veiculos/$slug`
- Criar uma página dinâmica para cada veículo e enviar slugs desconhecidos ao 404.
- Exibir imagem principal contida, galeria quando houver mais imagens e placeholder quando não houver.
- Mostrar somente dados existentes: ano, km, categoria, blindagem e tags.
- Criar CTA “Tenho interesse” com a mensagem exata e o veículo atual; fixá-lo na parte inferior em telas pequenas.
- Exibir link de retorno e duas sugestões de outros veículos.

### Vender `/vender`
- Usar a imagem gerada da BMW preta como fundo com tratamento escuro.
- Criar formulário em etapas, uma pergunta por tela: veículo, ano, quilometragem, objetivo e nome.
- Incluir progresso, validação, voltar e navegação por teclado.
- Ao concluir, abrir o WhatsApp com todos os dados preenchidos.
- Apresentar abaixo os três passos: Avaliação, Estratégia e Negociação.

### 404
- Criar estado de página não encontrada coerente com a identidade e retorno para o catálogo ou início.

## Dados e organização
- Definir o tipo `Vehicle` e os quatro registros em um único arquivo de dados, incluindo disponibilidade, destaque, tags, imagens e blindagem.
- Não inventar preço, potência, cor, opcionais ou outras especificações ausentes.
- Criar componentes reutilizáveis para navegação, cartões, molduras HUD, estados visuais e controles.
- Usar o roteamento nativo do projeto (TanStack Router, equivalente ao React Router solicitado nesta base) e Motion para as animações.

## Qualidade e validação
- Adicionar títulos, descrições e metadados sociais exclusivos em português para todas as páginas de conteúdo.
- Garantir foco visível, navegação por teclado, textos alternativos e carregamento tardio das imagens.
- Verificar catálogo, filtros persistidos na URL, ordenação, detalhes, 404, menu móvel, formulário e links do WhatsApp.
- Conferir visualmente em desktop e mobile, além de validar que o projeto termina sem erros.

## Fora desta etapa
- Home completa e campanhas de marketing.
- Banco de dados, painel administrativo ou cadastro real de estoque.
- Envio do formulário para um servidor; a conclusão será pelo WhatsApp conforme solicitado.
