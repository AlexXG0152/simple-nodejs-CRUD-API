export interface CustomResponse extends Response {
    setHeader?: string;
    statusCode?: number;
    end?: string;
  }