import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  status: number;
  data?: {
    message: string;
    stack: string;
    success: boolean;
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
};

export type TResponse<T> = {
  data?: {
    meta?: TMeta;
    message: string;
    result?: T[];
    data?: T[];
  };

  error?: TError;
  meta?: TMeta;
  success: boolean;
  message: string;
};

export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;

export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
