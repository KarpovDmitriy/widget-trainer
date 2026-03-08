export class AuthError extends Error {
  public readonly code: string | undefined;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'AuthError';
    this.code = code;
  }
}

export class NetworkError extends Error {
  public readonly statusCode: number | undefined;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = 'NetworkError';
    this.statusCode = statusCode;
  }
}

export class ProfileError extends Error {
  public readonly code: string | undefined;

  constructor(message: string, code?: string) {
    super(message);
    this.name = 'ProfileError';
    this.code = code;
  }
}
