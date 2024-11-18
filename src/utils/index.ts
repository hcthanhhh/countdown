import { v4 } from 'uuid';

export const sleep = (ms: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const scrollToBottom = (ref: any) => {
  if (!ref.current) return;
  ref.current.scrollTo({
    top: ref.current.scrollHeight,
  });
};

export function getUUID() {
  return v4().toString();
}

export function getTimestamp() {
  return Math.floor(Date.now());
}

export function setPropertyValue(obj: any, propertyName: string, newValue: any) {
  // if (Object.prototype.hasOwnProperty.call(obj, propertyName)) {
  //   obj[propertyName] = newValue;
  // } else obj[propertyName] = null;
  obj[propertyName] = newValue;
}
