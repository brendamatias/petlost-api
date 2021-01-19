const okPaginated = ({ total, perPage, currentPage, lastPage, rows }) => ({
  status: 200,
  data: {
    pagination: {
      total,
      perPage,
      currentPage,
      lastPage,
    },
    data: rows,
  },
});

const ok = (data) => ({ status: 200, data: { data } });
const created = (data) => ({ status: 201, data: { data } });
const noContent = () => ({ status: 204 });
const notFound = () => ({ status: 404, data: { code: 'NOT_FOUND' } });
const forbidden = (message = undefined) => ({
  status: 403,
  data: { code: 'FORBIDDEN', message },
});

export default { okPaginated, ok, created, noContent, notFound, forbidden };
