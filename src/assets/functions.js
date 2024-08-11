export function toKebabCase(str) {
    return str
        .trim()                       // Remove leading and trailing whitespace
        .toLowerCase()                // Convert to lowercase
        .replace(/\s+/g, '-')         // Replace spaces with hyphens
}