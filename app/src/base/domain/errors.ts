export class ModelError extends Error {
  public context: any;

  constructor(message: string, context: any = {}) {
    super(message);
    this.context = context;
  }
}
