export function validateEnv<T>(key: string, defaultValue?: T): T {
  const value = process.env[key];

  if (value === undefined || value === '') {
    if (defaultValue === undefined) {
      throw new Error(`${key} is not defined in environment variables`);
    }
    return defaultValue;
  }

  // Handle boolean values
  if (value === 'true') {
    return true as unknown as T;
  }
  if (value === 'false') {
    return false as unknown as T;
  }

  // Handle numeric values
  const numericValue = Number(value);
  if (!isNaN(numericValue)) {
    return numericValue as unknown as T;
  }

  // Fallback to string
  return value as unknown as T;
}

export const JWT_SECRET = validateEnv(
  'JWT_SECRET',
  'whiteboardspeakershoemanmaker'
);
export const NODE_ENV = validateEnv<'development' | 'production'>(
  'NODE_ENV',
  'production'
);

export const APP_URI = validateEnv('APP_URI', 'http://localhost:3000');
export const PORT = validateEnv<number>('PORT', 3000);

export const DB_TYPE = validateEnv<'postgres'>('DB_TYPE', 'postgres');
export const DB_HOST = validateEnv('DB_HOST', 'localhost');
export const DB_PORT = validateEnv<number>('DB_PORT', 5432);
export const DB_USER = validateEnv('DB_USER', 'postgres');
export const DB_PASSWORD = validateEnv('DB_PASSWORD', 'root');
export const DB_NAME = validateEnv('DB_NAME', 'pokelist');

export const FRONTEND_URI = validateEnv(
  'FRONTEND_URI',
  'http://localhost:3001'
);
