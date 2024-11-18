// services/LocalStorageService.ts

const CONFIG = {
  prefix: 'INFINIX',
} as const;

type PrefixType = typeof CONFIG.prefix;

class LocalStorageService {
  private prefix: PrefixType;

  constructor(prefix: PrefixType = CONFIG.prefix) {
    this.prefix = prefix;
  }

  /**
   * Constructs the full key with prefix.
   * @param name - The key name.
   * @returns The namespaced key.
   */
  private getKey(name: string): string {
    return `${this.prefix}:${name}`;
  }

  /**
   * Saves data to localStorage.
   * @param name - The key name.
   * @param value - The value to store.
   */
  public saveToLocalStorage<T>(name: string, value: T): void {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.error('localStorage is not available');
      return;
    }
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(this.getKey(name), serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  /**
   * Loads data from localStorage.
   * @param name - The key name.
   * @returns The parsed value or null if not found.
   */
  public loadFromLocalStorage<T>(name: string): T | null {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    try {
      const serialized = localStorage.getItem(this.getKey(name));
      if (serialized === null) return null;
      return JSON.parse(serialized) as T;
    } catch (error) {
      console.error(`Error loading from localStorage: ${error}`);
      return null;
    }
  }

  /**
   * Removes data from localStorage.
   * @param name - The key name.
   */
  public removeFromLocalStorage(name: string): void {
    if (typeof window === 'undefined' || !window.localStorage) return;
    try {
      localStorage.removeItem(this.getKey(name));
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  }
}

export default LocalStorageService;

export const localStorageService = new LocalStorageService(CONFIG.prefix);
