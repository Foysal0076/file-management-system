export type FetchFilesAndFoldersParams = {
  folder?: string
}

export type FetchAwsSignedUrlParams = {
  key?: string
}

export type AwsFilesAndFolders = {
  files: AwsFile[]
  folders: AwsFolder[]
}

export type AwsFile = {
  key: string
  lastModified: Date
  size: number
}

export type AwsFolder = {
  prefix: string
}

export type AwsSignedUrl = {
  url: string
}
