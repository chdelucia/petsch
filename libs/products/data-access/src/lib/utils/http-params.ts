import { HttpParams } from '@angular/common/http';

export function buildHttpParams(filters: Record<string, unknown>): HttpParams {
  return new HttpParams({
    fromObject: Object.entries(filters).reduce(
      (acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = value as
            | string
            | number
            | boolean
            | readonly (string | number | boolean)[];
        }
        return acc;
      },
      {} as Record<
        string,
        string | number | boolean | readonly (string | number | boolean)[]
      >,
    ),
  });
}
