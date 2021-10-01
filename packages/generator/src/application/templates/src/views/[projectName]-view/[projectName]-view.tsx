import { Heading, Layout } from '@mtfh/common/lib/components'

export const <%= projectNamePascal %>View = () => {
    return (
        <Layout>
            <Heading as="h1"><%= name %></Heading>
        </Layout>
    )
}