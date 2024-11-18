export enum StatusCode {
  Ok = 200,
  Created = 201,
  BadRequest = 400,
  Unauthorized = 6,
  TokenExpired = 7,
  Forbidden = 403,
  NotFound = 404,
  PinCodeIsRequired = 406,
  InternalServerError = 500,
}
export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export enum FileType {
  JPG = 'image/jpg',
  JPEG = 'image/jpeg',
  PNG = 'image/png',
  WEBP = 'image/webp',
}

export enum LoginProvider {
  Github = 'github',
  Google = 'google',
  Facebook = 'facebook',
  Linkedin = 'linkedin',
  Credential = 'credential',
  AzureAD = 'azure-ad',
}

export enum AcceptFile {
  Image = 'image/jpg, image/jpeg, image/png',
  PDF = 'application/pdf',
  All = 'image/*,application/pdf',
}

export enum ImageSize {
  x1 = '@1x',
  x2 = '@2x',
  x3 = '@3x',
}

export enum Language {
  VI = 'vi',
  EN = 'en',
}
