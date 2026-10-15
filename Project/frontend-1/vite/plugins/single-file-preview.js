// Single-file review build: preview <head>, no /public links, final file name.
import fs from 'node:fs';
import path from 'node:path';

const PREVIEW_FILE = 'MyHealthOpinions-preview.html';

export function singleFilePreview(root) {
  return {
    name: 'mho:single-file-preview',
    transformIndexHtml(html) {
      return html
        .replace(
          '<!--app-head-->',
          '<title>MyHealthOpinions — Website Preview</title>\n    <meta name="robots" content="noindex">\n    <meta name="description" content="Single-file review preview of the MyHealthOpinions website. Not for deployment.">'
        )
        .replace(/<link rel="(icon|apple-touch-icon|manifest)"[^>]*>\s*/g, '');
    },
    closeBundle() {
      const out = path.join(root, 'preview');
      const built = path.join(out, 'index.html');
      if (fs.existsSync(built)) fs.renameSync(built, path.join(out, PREVIEW_FILE));
    },
  };
}
