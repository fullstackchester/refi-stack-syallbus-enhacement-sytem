interface ErrorDetails {
  code?: unknown
  message?: unknown
}

function errorDetails(error: unknown): ErrorDetails {
  return typeof error === 'object' && error !== null ? error : {}
}

export function getErrorCode(error: unknown): string {
  const { code } = errorDetails(error)
  return typeof code === 'string' ? code : 'unknown'
}

export function getErrorMessage(error: unknown): string {
  const { message } = errorDetails(error)
  return typeof message === 'string' ? message : 'An unexpected error occurred.'
}

