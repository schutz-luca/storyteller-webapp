export const getSearchParams = () => {
    const url = window.location.href;
    const parsedUrl = new URL(url);
    return parsedUrl.searchParams;
}