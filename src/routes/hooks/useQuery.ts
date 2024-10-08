import { parse, stringify } from 'qs';
import { useMemo, useCallback } from 'react';
import { useSearchParams as _useSearchParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export type SortOrder = 'asc' | 'desc';

interface OrderBy {
  [key: string]: SortOrder;
}

interface QueryParams<FilterType = any> {
  sort?: OrderBy; // define the type for sort
  page?: { page: number; pageSize: number };
  filter?: FilterType; // TODO: This will be used for prisma filter
  [key: string]: any;
}

export function useQuery<FilterType>(): [
  QueryParams<FilterType>,
  {
    setQueryParams: (params: QueryParams<FilterType>) => void;
    setPage: (page: number) => void;
    setPageSize: (pageSize: number) => void;
  },
] {
  const [searchParams, setSearchParams] = _useSearchParams();

  const queryParams: QueryParams = useMemo<QueryParams>(() => {
    const { sort: rawSort, page: rawPage, filter, ...rest } = parse(searchParams.toString());
    const result: QueryParams = { ...rest, filter };

    if (rawSort) {
      result.sort = (rawSort as string).split(',').reduce((prev, field) => {
        const order: SortOrder = field.startsWith('-') ? 'desc' : 'asc';
        prev[field.replace('-', '')] = order;
        return prev;
      }, {} as OrderBy);
    }

    if (rawPage) {
      const [page, pageSize] = (rawPage as string).split(',').map((value) => parseInt(value, 10));
      result.page = { page, pageSize };
    }

    return result;
  }, [searchParams]);

  const setQueryParams = useCallback(
    ({ page, sort, ...rest }: QueryParams) => {
      const queryObject = { ...rest };

      if (sort) {
        queryObject.sort = Object.entries(sort)
          .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
          .join(',');
      }

      if (page) {
        queryObject.page = `${page.page},${page.pageSize}`;
      }

      setSearchParams(stringify(queryObject));
    },
    [setSearchParams]
  );

  const setPage = useCallback(
    (page: number) => {
      setQueryParams({
        ...queryParams,
        page: { page, pageSize: queryParams.page?.pageSize ?? 10 },
      });
    },
    [queryParams, setQueryParams]
  );

  const setPageSize = useCallback(
    (pageSize: number) => {
      setQueryParams({
        ...queryParams,
        page: { page: 1, pageSize },
      });
    },
    [queryParams, setQueryParams]
  );

  return useMemo(
    () => [queryParams, { setQueryParams, setPage, setPageSize }],
    [queryParams, setQueryParams, setPage, setPageSize]
  );
}
