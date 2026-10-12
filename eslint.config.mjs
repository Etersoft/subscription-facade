import js from '@eslint/js';
import tseslint from 'typescript-eslint';


export default tseslint.config(
  { ignores: ['dist/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      'linebreak-style': ['error', 'unix'],
      'max-len': ['error', 100],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always']
    }
  }
);
