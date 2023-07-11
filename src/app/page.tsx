import { isFullPage } from '@notionhq/client'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'
import { getPages } from '@/utils/notion'

export type IndexItem = {
  id: string
  title: string
  date: string
  tags: {
    id: string
    name: string
    color: string
  }[]
  path: string
}

export default async function Home() {
  const pages = await getPages()
  const indexes = pages.reduce((acc, curr) => {
    if (isFullPage(curr)) {
      const titleObj = curr.properties.Title
      const title = titleObj.type === 'title' ? titleObj.title[0].plain_text : 'No Title'
      const date = format(new Date(curr.created_time), 'MMMMdo', { locale: ja })
      const tagsObj = curr.properties.Tags
      const tags = tagsObj.type === 'multi_select' ? tagsObj.multi_select : []
      const createdTime = format(new Date(curr.created_time), 'yyyy/MM/dd/HHmmss')
      acc.push({ id: curr.id, title, date, tags, path: `/entry/${createdTime}/${curr.id}` })
    }
    return acc
  }, [] as IndexItem[])

  return (
    <>
      <div p={'y-8 x-4'} bg={'primary'} pos={'sticky'}>
        <header>
          <h1 text={'4xl'}>開発ログ</h1>
          <h2 m={'t-4'}>開発とか日常とかのログを残すブログ</h2>
        </header>
      </div>

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
    </>
  )
}
