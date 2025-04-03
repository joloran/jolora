export function capitalizeSmart(str: string) {
  const exceptions = ['de', 'da', 'do', 'dos', 'das', 'e']
  return str
    .toLowerCase()
    .split(' ')
    .map((word, index) =>
      exceptions.includes(word) && index !== 0
        ? word
        : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(' ')
}
