import { AwsFile } from '@/redux/apiQueries/apiQueries.type'

export const getLocalStorageItem = (key: string) => {
  const item = localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export const setLocalStorageItem = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const removeLocalStorageItem = (key: string) => {
  localStorage.removeItem(key)
}

export const isImage = (file: AwsFile) => {
  const fileTypeExtension = file.key.split('.').pop()?.toLowerCase()
  return ['png', 'jpg', 'jpeg', 'gif'].includes(fileTypeExtension ?? '')
}

export const isPdf = (file: AwsFile) => {
  const fileTypeExtension = file.key.split('.').pop()?.toLowerCase()
  return fileTypeExtension === 'pdf'
}

export const getFileType = (file: AwsFile): 'image' | 'pdf' | 'unknown' => {
  const fileTypeExtension = file.key.split('.').pop()?.toLowerCase()
  if (fileTypeExtension === 'pdf') return 'pdf'
  if (['png', 'jpg', 'jpeg', 'gif'].includes(fileTypeExtension ?? ''))
    return 'image'
  return 'unknown'
}
