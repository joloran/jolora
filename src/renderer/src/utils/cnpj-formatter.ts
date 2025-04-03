export function CNPJFormatter(CNPJ: string) {
  CNPJ = CNPJ.toUpperCase().replace(/[^a-zA-Z0-9]/g, '')

  CNPJ = CNPJ.replace(/([a-zA-Z0-9]{2})([a-zA-Z0-9])/, '$1.$2')
    .replace(/([a-zA-Z0-9]{3})([a-zA-Z0-9])/, '$1.$2')
    .replace(/([a-zA-Z0-9]{3})([a-zA-Z0-9])/, '$1/$2')
    .replace(/([a-zA-Z0-9]{4})([a-zA-Z0-9])/, '$1-$2')
    .replace(/(-[a-zA-Z0-9]{2})[a-zA-Z0-9]+?$/, '$1')

  return CNPJ
}
