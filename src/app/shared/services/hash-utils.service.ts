export class HashUtils {
  /**
   * Converts an object to a sorted JSON string.
   *
   * @param object The object to be converted.
   * @returns A canonicalized JSON string representation of the object.
   */
  static canonicalize(object: any): string {
    return JSON.stringify(object, Object.keys(object).sort());
  }

  /**
   * Generates a hash from the given input string using the DJB2 algorithm.
   * @param {string} input - The input string to hash.
   * @returns {number} - The generated hash value.
   */
  static generateHash(input: string): number {
    if (!input) return 0;

    let hash = 5381; // Initialize hash with a prime number.

    for (const char of input) {
      // Multiply hash by 33 and XOR with the character's Unicode code point.
      hash = (hash * 33) ^ char.charCodeAt(0);
    }

    // Ensure the hash is an unsigned 32-bit integer
    return hash >>> 0;
  }

  static generateHashKey(object: any): number {
    const canonicalizedObject = HashUtils.canonicalize(object);
    return HashUtils.generateHash(canonicalizedObject);
  }
}
