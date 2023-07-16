import { isFullPage } from '@notionhq/client'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { getPages } from '@/utils/notion'
import { parsePage } from '@/utils/pageParser'

export type IndexItem = PageMeta & {
  path: string
}

export default async function Home() {
  const pages = await getPages()
  const indexes = pages.reduce((acc, curr) => {
    if (isFullPage(curr)) {
      const meta = parsePage(curr)
      if (meta) {
        const createdTime = format(new Date(curr.created_time), 'yyyy/MM/dd')
        acc.push({ ...meta, path: `/entry/${createdTime}/${meta.id}` })
      }
    }
    return acc
  }, [] as IndexItem[])

  return (
    <main className={'p-6'}>
      <ul space={'y-4'}>
        {indexes.map(({ id, title, date, tags, path }) => (
          <li key={id} flex='' hover={'underline opacity-60'}>
            <a href={path}>
              {date} {title}
              {tags.map(({ id, name, color }) => (
                <span key={id} className={`bg-${color}`}>
                  {name}
                </span>
              ))}
            </a>
          </li>
        ))}
      </ul>
    </main>
  )
}
