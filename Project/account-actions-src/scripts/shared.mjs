export const target = ['chrome100', 'safari15', 'firefox100', 'edge100'];

export const common = {
  bundle: true,
  jsx: 'automatic',
  target,
  loader: { '.js': 'jsx', '.webp': 'file', '.png': 'file', '.svg': 'file' },
  legalComments: 'none',
  logLevel: 'info',
};

export const fontsLink =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=Figtree:wght@400;500;600;700&family=Red+Hat+Mono:wght@500;600&display=swap">';
