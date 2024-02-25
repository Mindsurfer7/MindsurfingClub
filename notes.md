4. Resolving 'Property 'env' does not exist on type 'ImportMeta''

When using environment variables in Vite, you may encounter an error saying "Property 'env' does not exist on type 'ImportMeta'". To resolve this issue, follow these steps:

    Create a file named vite-env.d.ts in the root directory of your project.
    Add the following content to this file:

/// <reference types="vite/client" />

https://www.npmjs.com/package/@andylacko/vite-svg-react-loader

vite js runtime cause error when importing a type or interface :
vite makes me import type as import type separately from js entities

https://stackoverflow.com/questions/76983697/why-does-my-vue-vite-typescript-application-require-me-to-separate-import-and

whats verbatimModuleSyntax ?
