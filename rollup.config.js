import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import dts from "rollup-plugin-dts";
import { sizeSnapshot } from "rollup-plugin-size-snapshot";

export default [
    {
        input: 'src/index.ts',
        output: [{ file: 'untabbable.d.ts' }],
        plugins: [dts()]
    },
    {
        input: 'src/index.ts',
        output: [
            {
                file: 'untabbable.esm.js',
                format: 'esm',
                exports: 'named',
                globals: {
                    'react': 'react',
                },
            },
            {
                file: 'untabbable.cjs.js',
                format: 'cjs',
                exports: 'named',
                globals: {
                    'react': 'react',
                },
            }
        ],
        plugins: [
            commonjs(),
            typescript(),
            sizeSnapshot()
        ],
        external: ['react'],
    }
]