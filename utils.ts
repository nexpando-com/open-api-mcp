/**
 * Sanitizes an MCP tool name to ensure it contains only valid characters.
 *
 * @param {string} name - The raw tool name to sanitize
 * @returns {string} The sanitized tool name
 */
export const sanitize = (name: string) => {
  if (!name) {
    return ''
  }

  // Trim whitespace
  let sanitized = name.trim()

  // Keep only alphanumeric, underscore, and dash characters
  sanitized = sanitized.replace(/[^\w\-]/g, '_')

  // Ensure the name doesn't start with a number or special character
  if (sanitized && !/^[a-zA-Z]/.test(sanitized)) {
    sanitized = 'tool_' + sanitized
  }

  // Limit length to prevent buffer issues
  const maxLength = 64
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }

  return sanitized
}
