const mix = require('laravel-mix')
Mix.manifest.refresh = _ => void 0

mix.js('src/main.js', 'dist/main.js')
.copy("manifest.json", "dist/manifest.json")