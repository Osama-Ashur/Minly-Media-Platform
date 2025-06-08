class appError extends Error {
  public statusCode?: number;
  public statusText?: string;

  constructor() {
    super();
  }

  create(message: string, statusCode: number, statusText: string): this {
    this.message = message;
    this.statusCode = statusCode;
    this.statusText = statusText;
    return this;
  }
}

export default new appError();
