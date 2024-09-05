export function toKebabCase(str: string) {
  return str.trim().toLowerCase().replace(/\s+/g, "-");
}
