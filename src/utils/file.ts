import {URLDataBase64} from "interfaces/utilities"

/**
 * Generates "unique" file name
 */
export function getFileId(file?: File | null) {
  if (file == null) return ""
  return `${file.lastModified}-${file.size}-${file.name}`
}

export function FileToURLDataBase64(file: File): Promise<URLDataBase64> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as URLDataBase64)
    reader.onerror = reject
  })
}

export async function getFileFromURL(url: string) {
  const fileName = url.slice(url.lastIndexOf("/") + 1)

  const response = await fetch(url)
  const Uint8Array = (await response.body?.getReader()?.read())?.value

  return new File(Uint8Array ? [Uint8Array] : [], fileName, {
    type: response.headers.get("content-type") || "image",
  })
}

export function amendInputFiles(target: HTMLInputElement, files: File[]) {
  // https://stackoverflow.com/questions/5632629/how-to-change-a-file-inputs-filelist-programmatically
  const dataTransfer = new DataTransfer()

  files.forEach(file => dataTransfer.items.add(file))
  target.files = dataTransfer.files
}
