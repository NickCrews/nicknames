import { namesData } from "./data";

/**
 * Lookup nicknames and diminutive names for US given names.
 *
 * Mirrors the Python `NameDenormalizer` API.
 */
export class NameDenormalizer {
  private map: Map<string, string[][]>;

  constructor() {
    this.map = new Map();
    for (const group of namesData) {
      for (const name of group) {
        let existing = this.map.get(name);
        if (!existing) {
          existing = [];
          this.map.set(name, existing);
        }
        existing.push(group);
      }
    }
  }

  /**
   * Get the set of related names for a given name.
   * Returns `undefined` if the name is not found.
   *
   * @example
   * ```ts
   * const nd = new NameDenormalizer();
   * nd.get("greg"); // Set { "gregory", "gory" }
   * nd.get("xyz");  // undefined
   * ```
   */
  get(name: string): Set<string> | undefined {
    const key = name.toLowerCase();
    const groups = this.map.get(key);
    if (!groups) {
      return undefined;
    }
    const result = new Set<string>();
    for (const group of groups) {
      for (const n of group) {
        result.add(n);
      }
    }
    result.delete(key);
    return result;
  }

  /**
   * Get the set of related names for a given name.
   * Throws an `Error` if the name is not found.
   *
   * This is the equivalent of Python's `__getitem__` / bracket access.
   *
   * @example
   * ```ts
   * const nd = new NameDenormalizer();
   * nd.lookup("greg"); // Set { "gregory", "gory" }
   * nd.lookup("xyz");  // throws Error
   * ```
   */
  lookup(name: string): Set<string> {
    const result = this.get(name);
    if (result === undefined) {
      throw new Error(`Name not found: ${name}`);
    }
    return result;
  }
}
