/**
 * Centralized error handling utilities
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string = 'UNKNOWN_ERROR',
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export const ErrorCodes = {
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  STORAGE_ERROR: 'STORAGE_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unexpected error occurred';
}

export function handleError(error: unknown, context: string = ''): AppError {
  const message = getErrorMessage(error);
  const errorLog = `[${context}] ${message}`;
  
  console.error(errorLog);
  
  if (error instanceof AppError) {
    return error;
  }
  
  return new AppError(message, ErrorCodes.UNKNOWN_ERROR, 500);
}

export function createNotFoundError(resource: string): AppError {
  return new AppError(
    `${resource} not found`,
    ErrorCodes.NOT_FOUND,
    404
  );
}

export function createValidationError(field: string, message: string): AppError {
  return new AppError(
    `Validation failed for ${field}: ${message}`,
    ErrorCodes.VALIDATION_ERROR,
    400
  );
}

export function createStorageError(message: string): AppError {
  return new AppError(
    `Storage error: ${message}`,
    ErrorCodes.STORAGE_ERROR,
    500
  );
}

export function retryAsync<T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000
): Promise<T> {
  return fn().catch(async (error) => {
    if (retries <= 1) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return retryAsync(fn, retries - 1, delay * 2);
  });
}
