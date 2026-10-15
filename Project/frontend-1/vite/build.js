// Build options for the two build flavours of this project.

/** Normal production build → dist/ (browser bundle). `isSsrBuild` is the temporary Node renderer in dist-ssr/. */
export function clientBuildOptions({ isSsrBuild }) {
  return {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    sourcemap: false,
    assetsDir: 'assets',
    // Blog articles and the help-assistant knowledge base are separate on-demand chunks.
    chunkSizeWarningLimit: 600,
    // The temporary server bundle (dist-ssr/) never needs the public files.
    copyPublicDir: !isSsrBuild,
  };
}

/** `vite build --mode singlefile` → preview/MyHealthOpinions-preview.html (one file for review, not for deployment). */
export function singleFileBuildOptions() {
  return { outDir: 'preview', emptyOutDir: true, target: 'es2020', sourcemap: false, chunkSizeWarningLimit: 4000 };
}
