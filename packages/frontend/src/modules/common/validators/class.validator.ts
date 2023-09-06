export interface IValidationError<T> {
  key: keyof T;
  msg: string;
}

export interface IValidationLength {
  min: number;
  max: number;
}

export const isTypeString = <T>(value: T[keyof T]) => typeof value === 'string';
export const isTypeArray = <T>(value: T[keyof T]) => Array.isArray(value);
export const isTypeNumber = <T>(value: T[keyof T]) => !Number.isNaN(+value);

export class ClassValidator<T extends Object> {
  constructor(private object: T, public errors: IValidationError<T>[] = []) {}

  private lengthErrors(key: keyof T, config: IValidationLength, length: number) {
    if (length < config.min) {
      this.errors.push({
        key,
        msg: `Must be at least ${config.min} length`
      });
    }
    if (length > config.max) {
      this.errors.push({
        key,
        msg: `Must be ${config.max} length or less`
      });
    }
    return this;
  }

  public length(key: keyof T, config: IValidationLength) {
    if (isTypeString(this.object[key])) {
      const strValue = this.object[key] as string;
      return this.lengthErrors(key, config, strValue.length);
    }
    if (isTypeArray(this.object[key])) {
      const arrValue = this.object[key] as any[];
      return this.lengthErrors(key, config, arrValue.length);
    }
    return this;
  }

  private isNotEmptyErrors(key: keyof T, length: number) {
    if (length === 0) {
      this.errors.push({
        key,
        msg: 'Required'
      });
    }
    return this;
  }

  public isNotEmpty(key: keyof T) {
    if (isTypeString(this.object[key])) {
      const str = this.object[key] as string;
      return this.isNotEmptyErrors(key, str.length);
    }
    if (isTypeArray(this.object[key])) {
      const arr = this.object[key] as any[];
      return this.isNotEmptyErrors(key, arr.length);
    }
    return this;
  }

  public isNumber(key: keyof T) {
    if (!isTypeNumber(this.object[key])) {
      this.errors.push({
        key,
        msg: 'Must be number'
      });
    }
    return this;
  }

  public isEmail(key: keyof T) {
    if (!isTypeString(this.object[key])) {
      this.errors.push({
        key,
        msg: 'Must be string'
      });
    }
    const str = this.object[key] as string;
    const match = str.match(/^\S+@\S+\.\S+$/);
    if (!match) {
      this.errors.push({
        key,
        msg: 'String is not email'
      });
    }
    return this;
  }

  public isEqual(key1: keyof T, key2: keyof T, keyErr: keyof T) {
    if (this.object[key1] !== this.object[key2]) {
      this.errors.push({
        key: keyErr,
        msg: `Must be equal to ${key1 === keyErr ? (key2 as string) : (key1 as string)}`
      });
    }
    return this;
  }
}

export const createValidation = <T extends Object>(object: T, err: IValidationError<T>[] = []) =>
  new ClassValidator(object, err);
