const generateName = (employeeName: string): string => {
  const newEmployeeName = employeeName.toUpperCase().split(' ')
    .filter(word => word.length >= 3)
    .map((word, i, arr) => (i !== 0 && i !== arr.length - 1) ? word[0] : word)

  return newEmployeeName.join(' ')
}

export default generateName
