import { isFullPage } from '@notionhq/client'
import { PageObjectResponse, PartialPageObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { format } from 'date-fns'
import ja from 'date-fns/locale/ja'

export const parsePage = (curr: PageObjectResponse | PartialPageObjectResponse) => {
  if (isFullPage(curr)) {
    const id = curr.id
    const date = format(new Date(curr.created_time), 'yyyy-MM-dd', { locale: ja })
    const title = curr.properties.Title.type === 'title' ? curr.properties.Title.title[0].plain_text : 'No Title'
    const tags = curr.properties.Tags.type === 'multi_select' ? curr.properties.Tags.multi_select : []
    return { id, title, date, tags } as PageMeta
  }

  return null
}
