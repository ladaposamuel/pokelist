/**
 * Safely parse environment variables
 * @param key The key
 * @param defaultValue An optional default value if the environment variable does not exist
 */
export function validateEnv<T extends string | number>(
  key: keyof NodeJS.ProcessEnv,
  defaultValue?: T
): T {
  const value = process.env[key] as T | undefined;

  if (!value) {
    if (typeof defaultValue !== 'undefined') {
      return defaultValue;
    }
    throw new Error(`${key} is not defined in environment variables`);
  }

  return value;
}

// ENV
export const JWT_SECRET = validateEnv('JWT_SECRET');
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
