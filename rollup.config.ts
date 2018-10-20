import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const libraryName = 'react-lazy-img';

export default {
  input: `src/${libraryName}.tsx`,
  output: [
    {
      file: pkg.main,
      name: libraryName,
      format: 'umd',
      sourcemap: true,
      globals: {
        react: 'React'
      }
    },
    { file: pkg.module, format: 'es', sourcemap: true }
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: ['react'],
  watch: {
    include: 'src/**'
  },
  plugins: [
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs({
      include: ['node_modules/**'],
      exclude: [],
      namedExports: {
        'node_modules/react/react.js': ['Children', 'Component', 'createElement']
      }
    }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),

    // Resolve source maps to the original source
    sourceMaps()
  ]
};
