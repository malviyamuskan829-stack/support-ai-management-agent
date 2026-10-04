export class OpenRouterError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'OpenRouterError';
    this.status = status;
  }
}

export class ValidationError extends Error {
  status: number;
  constructor(message: string, status: number = 400) {
    super(message);
    this.name = 'ValidationError';
    this.status = status;
  }
}
