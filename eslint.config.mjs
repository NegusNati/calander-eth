import next from 'eslint-config-next'

const config = [
  {
    ignores: ['node_modules/', '.next/', 'build/', 'dist/', '.pnpm-store/'],
  },
  ...next,
]

export default config
