export const buildQueryParams = (query: { [key: string]: string | number | boolean }) => {
    return Object.keys(query)
        .filter((key) => query[key])
        .map((key) => `${key}=${encodeURIComponent(query[key])}`)
        .join('&');
};
