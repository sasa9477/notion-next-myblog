import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'

const notionClient = new Client({ auth: process.env.NOTION_API_KEY })
const n2m = new NotionToMarkdown({ notionClient: notionClient })
const databaseId = process.env.NOTION_DATABASE_ID ?? ''

export const getPages = async () => {
  const data = await notionClient.databases.query({
    database_id: databaseId,
    sorts: [{ timestamp: 'created_time', direction: 'ascending' }],
  })
  return data.results
}

export const getPageContent = async (pageId: string) => {
  const mdblocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdblocks)
  return mdString.parent
}
