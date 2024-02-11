import axios, { AxiosResponse, AxiosError } from "axios";

interface HttpResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

interface ErrorResponse {
  error?: string;
}

async function handleRequest<T>(
  request: Promise<AxiosResponse<T>>
): Promise<HttpResponse<T>> {
  try {
    const response: AxiosResponse<T> = await request;
    return { success: true, data: response.data };
  } catch (error: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      errorMessage =
        axiosError.response?.data?.error ||
        axiosError.message ||
        "An unexpected error occurred";
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { success: false, error: errorMessage };
  }
}

export const HTTP = {
  get: <T>(url: string): Promise<HttpResponse<T>> =>
    handleRequest(axios.get<T>(url)),
  post: <T>(url: string, data: any): Promise<HttpResponse<T>> =>
    handleRequest(axios.post<T>(url, data)),
  put: <T>(url: string, data: any): Promise<HttpResponse<T>> =>
    handleRequest(axios.put<T>(url, data)),
  delete: <T>(url: string): Promise<HttpResponse<T>> =>
    handleRequest(axios.delete<T>(url)),
};
