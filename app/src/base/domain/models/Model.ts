import validate from 'class-validator';

export abstract class Model {
  static build<T extends typeof Model>(this: T, props: any): InstanceType<T> {
    const instance = new (this as any)() as InstanceType<T>;

    instance.updateProps(props);

    instance.afterInitialize();

    return instance;
  }

  afterInitialize(): void {
    // Hook for subclasses
  }

  validate(): void {
    validate(this);
  }

  updateProps(props: any): void {
    Object.keys(props).forEach((key: string) => {
      const k = key;
      if (props[k] !== undefined) {
        (this as any)[k] = props[k];
      }
    });
  }
}
