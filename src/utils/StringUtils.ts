import chroma from 'chroma-js';

import { BASE64_PREFIX } from '@/common/constants';


export default class StringUtils {
  static sliceApiKeys = (key: string, index = 5, symbol = '......') => {
    if (!key) return '';
    return `${key.slice(0, index)}${symbol}${key.slice(-index)}`;
  };

  static getDomainUser(email: string) {
    const [domain] = email.split('@');
    return domain;
  }

  static numberToCurrency(number: number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

  static checkBase64AndHttps = (url: string) => {
    const httpsPattern = /^https:\/\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]+$/;
    const isHttps = httpsPattern.test(url);
    if (isHttps) {
      return url;
    }
    return `${BASE64_PREFIX}${url}`;
  };

  static rgba(color: string, opacity: number) {
    return `rgba(${chroma(color).rgb().join(', ')}, ${opacity})`;
  }

  static getContrastColor(backgroundColor: string) {
    backgroundColor = backgroundColor.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(backgroundColor.substring(0, 2), 16);
    const g = parseInt(backgroundColor.substring(2, 4), 16);
    const b = parseInt(backgroundColor.substring(4, 6), 16);

    // Calculate relative luminance
    function calculateRelativeLuminance(color: number) {
      color /= 255;
      return color <= 0.03928 ? color / 12.92 : ((color + 0.055) / 1.055) ** 2.4;
    }

    // Calculate contrast ratio
    const luminance =
      0.2126 * calculateRelativeLuminance(r) +
      0.7152 * calculateRelativeLuminance(g) +
      0.0722 * calculateRelativeLuminance(b);
    const contrast = (luminance + 0.05) / (1.05 - luminance);

    // Determine text color based on contrast ratio
    return contrast > 3 ? 'black' : 'white';
  }
  // Check if the luminance is bright or dark

  static generateRandomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789';
    let result = '';
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static capitalizeFirstLetter(string: string): string {
    return string.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  static getNameByEnumNumber(id: number, enums: any, define: string) {
    if (enums[id] !== undefined && enums[id] !== null) {
      const name = enums[id][0].toLowerCase() + enums[id].substring(1);
      return `define.${define}.${name}`;
    }
    return 'common.unknown';
  }
}
