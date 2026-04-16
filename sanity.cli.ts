import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'g8n7tvko',
    dataset: 'production'
  },
  // @ts-expect-error -- deployment config added in newer Sanity CLI
  deployment: {
    autoUpdates: true,
  }
})
