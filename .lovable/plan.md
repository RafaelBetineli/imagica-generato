# Plano — Home imersiva GETCARS

## Escopo
Substituir somente a página inicial por uma experiência cinematográfica de 100dvh conduzida por um trilho de scroll de aproximadamente 500vh. Catálogo, detalhes, página Vender, dados e identidade existentes permanecem intactos.

## Cena e narrativa
- Criar uma única cena fixa com seis momentos sincronizados ao progresso do scroll: Abertura, Portal, Coleção, Blindados, Vender e Fechamento.
- Manter chamadas permanentes para estoque e WhatsApp, além de “Pular para o estoque” e índice lateral navegável.
- Adaptar o cabeçalho e ocultar rodapé/botão flutuante compartilhados somente na home, substituindo-os pelos controles próprios da experiência.

## Camada 3D
- Construir um escudo extrudado em Three.js a partir de um path SVG inspirado no contorno da logo enviada, acompanhado da estrela.
- Aplicar material metálico dourado, iluminação de estúdio com Lightformers e DPR limitado.
- Animar flutuação, rotação, inclinação por cursor e avanço da câmera no portal.
- Carregar a cena 3D de forma tardia e oferecer composição estática quando WebGL ou movimento não estiver disponível.

## Partículas e veículos
- Criar um canvas 2D que amostra as imagens já cadastradas no arquivo central de veículos.
- Fazer as partículas transitarem entre Porsche, BMW e Suburban, com repulsão do cursor e quantidades adaptadas para desktop/mobile.
- Revelar a foto real em tamanho contido após cerca de 600ms sem scroll e retornar às partículas quando o movimento recomeçar.
- Ler nomes, ano, quilometragem, categoria, preço e links diretamente dos dados existentes.

## Texto e interação
- Sincronizar os estados visuais e textuais com Anime.js v4 e usar SplitText na abertura.
- Usar Lenis para suavização do scroll e permitir navegação por toque no mobile.
- Exibir cada momento como texto real e acessível no DOM, incluindo links corretos para veículo, blindados, avaliação, Instagram e WhatsApp.
- Incluir cursor dourado personalizado apenas em desktop e botões magnéticos no fechamento.

## Desempenho e validação
- Consolidar a animação principal em um único ciclo, limitar densidade/DPR, suspender trabalho quando a aba estiver oculta e respeitar redução de movimento.
- Validar início, cada marco do scroll, repouso sobre veículos, links, índice lateral, fallback estático, desktop e mobile.
- Confirmar que a home ocupa uma única cena fixa e que as demais páginas continuam visual e funcionalmente inalteradas.
