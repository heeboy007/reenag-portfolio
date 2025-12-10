import nextMdx from '@next/mdx'

const withMdx = nextMdx({
    // By default only the `.mdx` extension is supported.
    extension: /\.mdx?$/,
    options: {},
})

const nextConfig = withMdx({
    // Support MDX files as pages:
    pageExtensions: ['md', 'mdx', 'tsx', 'ts', 'jsx', 'js'],
    reactCompiler: true,
    // reactStrictMode: false,
})

export default nextConfig