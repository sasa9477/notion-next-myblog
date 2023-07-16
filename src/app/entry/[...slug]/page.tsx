import { ParsedUrlQuery } from 'querystring'
import { isFullPage } from '@notionhq/client'
import { format } from 'date-fns'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'
import { getPage, getPageBlockMdString, getPages } from '@/utils/notion'
import { parsePage } from '@/utils/pageParser'

export type BlogDetailPageProps = {
  params: ParsedUrlQuery
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const slug = params.slug as string[]
  const pageId = slug[slug.length - 1]
  const page = await getPage(pageId)
  const pageMeta = parsePage(page)
  const mdString = await getPageBlockMdString(pageId)

  if (!pageMeta) return <></>

  return (
    <main>
      <article p={'y-8'}>
        <header m={'b-8'}>
          <p m={'b-4'}>{pageMeta.date}</p>
          <h1 text={'2xl'} font={'bold'}>
            {pageMeta.title}
          </h1>
          {pageMeta.tags.length > 0 && (
            <ul flex=''>
              {pageMeta.tags.map(({ id, name, color }) => (
                <li key={id} className={`bg-${color}`}>
                  {name}
                </li>
  ))}
  </ul>
          )}
          <p className={'before:content-["fuga"] before:block'}>hoge</p>
          <p before={'content-["hoge"]'}>hoge</p>
        </header>
        <ReactMarkdown
          components={{
            h1: ({ ...props }) => <h1 text={'xl'} font={'bold'} {...props} />,
            h2: ({ ...props }) => <h2 text={'xl'} font={'bold'} {...props} />,
            a: ({ href, ...props }) => <Link href={href ?? '/404'} prefetch={false} underline='' {...props} />,
            pre: ({ ...props }) => (
              // <code className={'before:content-none before:block before:absolute w-fll h-full bg-gray'} {...props} />
              <pre className={'before:content-none before:w-2px before:h-10px before:bg-blue-300'} {...props} />
            ),
            code: ({ ...props }) => (
              <code className={'before:content-[""] before:block before:absolute before:w-fll before:h-full before:bg-gray'} {...props} />
              // <code className={'before:content-[""] before:block before:absolute w-fll h-full bg-gray'} {...props} />
              // <code className={'before:w-2px before:h-10px before:bg-blue-300'} {...props} />
            ),
          }}
        >
          {mdString}
        </ReactMarkdown>
      </article>
    </main>
  )
}

export async function generateStaticParams() {
  const pages = await getPages()

  return pages.reduce(
    (acc, curr) => {
      if (isFullPage(curr)) {
        const createdTime = format(new Date(curr.created_time), 'yyyy/MM/dd')
        acc.push({ slug: [...createdTime.split('/'), curr.id] })
      }
      return acc
    },
    [] as { slug: string[] }[]
  )
}
