import crypto from 'crypto';

// Base62 character set (0-9, a-z, A-Z)
const BASE62_CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


export function generateCode(length: number = 7): string {
  let code = '';
  const randomBytes = crypto.randomBytes(length * 2); // Extra bytes for better randomness
  
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % BASE62_CHARS.length;
    code += BASE62_CHARS[randomIndex];
  }
  
  return code;
}


const RESERVED_PATHS = new Set([
  'api',
  'admin',
  'terms',
  'privacy',
  'about',
  'help',
  '_next',
  'favicon.ico',
]);


export function isReservedCode(code: string): boolean {
  return RESERVED_PATHS.has(code.toLowerCase());
}


export function isValidUrl(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
}





