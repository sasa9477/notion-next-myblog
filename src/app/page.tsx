import { isFullPage } from '@notionhq/client'
import { format } from 'date-fns'
import { getPages } from '@/utils/notion'

export default async function Home() {
  const pages = await getPages()
  const indexes = pages.reduce((acc, curr) => {
    if (isFullPage(curr)) {
      const titleObj = curr.properties.Title
      const title = titleObj.type === 'title' ? titleObj.title[0].plain_text : 'No Title'
      const createdTime = format(new Date(curr.created_time), 'yyyy/MM/dd/HHmmss')
      acc.push({ id: curr.id, title: title, path: `/entry/${createdTime}/${curr.id}` })
    }
    return acc
  }, [] as { id: string; title: string; path: string }[])

  return (
    <main className={'flex min-h-screen flex-col items-center justify-between p-24'}>
      {indexes.map(({ id, title, path }) => (
        <a key={id} href={path} className={'flex flex-col items-center justify-between p-24'}>
          {title}
        </a>
      ))}
      <button
        bg={'blue-400 hover:blue-500 dark:blue-500 dark:hover:blue-600'}
        text={'sm white'}
        font={'mono light'}
        p={'y-2 x-4'}
        border={'2 rounded blue-200'}
      >
        Button
      </button>
    </main>
  )
}
