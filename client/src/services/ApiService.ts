export class ApiService {
  public abortController: AbortController;
  private abortSignal: AbortSignal;
  public abort: typeof this.abortController.abort;

  constructor() {
    this.abortController = new AbortController();
    this.abortSignal = this.abortController.signal;
    this.abort = () => this.abortController.abort(); // this context will be lost if abort is passed as function and not invoked inside arrow function
  }

  get isAborted() {
    return this.abortSignal.aborted;
  }

  public async fetch<T>(
    url: string
  ): Promise<[data: T | null, status: number | undefined]> {
    let response = null;
    try {
      response = await fetch(url, {
        signal: this.abortSignal,
      });
      if (!response.ok) {
        throw new Error(
          `Failed fetching ${url} - Response.ok was falsy. Status: ${response.status} - ${response.statusText}`
        );
      }
      if (response.status === 204) {
        console.info(
          '%c[INFO] Request successfully completed with status code 204 - No content',
          'color: yellow'
        );
        return [null, 204];
      }
      const data: T = await response.json();
      return [data, 200];
    } catch (error) {
      if (this.abortSignal.aborted) {
        console.info('The user aborted the request');
      } else {
        console.error('The request failed with error:', error);
      }
      return [null, response?.status];
    }
  }
}
