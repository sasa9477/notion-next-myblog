import { ParsedUrlQuery } from 'querystring'
import { isFullPage } from '@notionhq/client'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { getPageContent, getPages } from '@/utils/notion'

export type BlogDetailPageProps = {
  params: ParsedUrlQuery
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const slug = params.slug as string[]
  const pageId = slug[slug.length - 1]
  const page = await getPageContent(pageId)

  return (
    <main className={''}>
      <ReactMarkdown>{page}</ReactMarkdown>
    </main>
  )
}

export async function generateStaticParams() {
  const pages = await getPages()

  return pages.reduce((acc, curr) => {
    if (isFullPage(curr)) {
      const createdTime = format(new Date(curr.created_time), 'yyyy-MM-dd-HHmmss')
      acc.push({ slug: [...createdTime.split('-'), curr.id] })
    }
    return acc
  }, [] as { slug: string[] }[])
}
