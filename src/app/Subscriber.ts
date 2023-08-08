export class Subscriber {
  constructor(private url: string = '', private callback: any) {}

  get URL() {
    return this.url;
  }

  get CALLBACK() {
    return this.callback;
  }
}
