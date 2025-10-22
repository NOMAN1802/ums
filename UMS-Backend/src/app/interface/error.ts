/* eslint-disable @typescript-eslint/no-explicit-any */
export type TErrorSources = {
    path: string | number;
    message: string;
  }[];
  
  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
  };

  export type TGenericErrorResponse1 = {
    statusCode: number;
    message: string;
    errorSources: TErrorSources;
    stack: any
  };