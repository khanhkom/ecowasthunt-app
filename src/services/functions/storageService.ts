import { MMKV } from 'react-native-mmkv';

const storage = new MMKV();

type StorableValue = boolean | number | object | string;

function parseValue(value: string): boolean | number | object | string {
  try {
    const parsed = JSON.parse(value) as unknown;
    if (
      typeof parsed === 'string' ||
      typeof parsed === 'number' ||
      typeof parsed === 'boolean' ||
      (typeof parsed === 'object' && parsed !== null)
    ) {
      return parsed;
    }
    return value;
  } catch {
    return value;
  }
}

const storageService = {
  clear: () => {
    storage.clearAll();
  },
  getItem: (key: string): boolean | number | object | string | undefined => {
    const value = storage.getString(key);
    if (value === undefined) return undefined;
    return parseValue(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
  },
  setItem: (key: string, value: StorableValue) => {
    const data = typeof value === 'string' ? value : JSON.stringify(value);
    storage.set(key, data);
  },
};

export default storageService;
