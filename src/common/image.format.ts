import { ImageSize } from './enums';

export function formatImg(addressImg: string, imageSize = ImageSize.x3) {
  return addressImg.replace(/(\.[^.]+$)/, `${imageSize}$1`);
}
