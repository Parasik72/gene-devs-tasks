import * as path from 'path';

export const STATIC_PATH = path.resolve(__dirname, process.env.STATIC_PATH || '');
export const PHOTOS_PATH = path.resolve(__dirname, process.env.PHOTOS_PATH || '');
