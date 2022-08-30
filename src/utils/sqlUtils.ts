interface mapSQl {
  objectColumns: string
  objectValues: any
}

export function mapObjectToUpdateQuery ({ object, offset = 1 }): mapSQl {
  const objectColumns = Object.keys(object)
    .map((key, index) => `"${key}"=$${index + offset}`)
    .join(',')
  const objectValues = Object.values(object)

  return { objectColumns, objectValues }
}
