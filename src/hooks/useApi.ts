import { useState } from 'react';
import apiClient from '@/lib/axios';

interface UseApiOptions {
  retries?: number;
  retryDelay?: number;
  timeout?: number;
}

export const useApi = (options: UseApiOptions = {}) => {
  const { retries = 2, retryDelay = 1000, timeout = 30000 } = options;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callApi = async <T>(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: unknown,
    attempt: number = 0
  ): Promise<T | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await apiClient.request<T>({
        method,
        url,
        data,
        timeout,
      });

      return response.data;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado';
      
      // Si hay intentos restantes y es un error de timeout o conexión, reintentar
      if (attempt < retries && (
        errorMessage.includes('timeout') || 
        errorMessage.includes('conectar') ||
        errorMessage.includes('network')
      )) {
        console.log(`Reintentando... (${attempt + 1}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return callApi(method, url, data, attempt + 1);
      }

      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    callApi,
    isLoading,
    error,
    clearError,
  };
}; 