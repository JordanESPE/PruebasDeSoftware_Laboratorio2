// Importar la configuración base de reglas recomendadas de ESLint para JavaScript
const js = require('@eslint/js');

// Exportar un arreglo de configuraciones específicas para ESLint
module.exports = [
  js.configs.recommended,
  {
    // Configurar los archivos dentro de la carpeta src con extensión .js
    files: ['src/**/*.js'],
    
    // Gestionar opciones del lenguaje para estos archivos
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'commonjs',
      globals: {
        console: 'readonly',
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        exports: 'readonly',
        Buffer: 'readonly'
      }
    },
    
    // Crear reglas de ESLint que se aplicarán a estos archivos
    rules: {
      'no-unused-vars': 'warn',
      'no-console': 'off',
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-trailing-spaces': 'error',
      'eol-last': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'never'],
      'arrow-spacing': 'error',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error'
    }
  }
];
