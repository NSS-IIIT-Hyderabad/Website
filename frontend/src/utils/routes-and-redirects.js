const routes = {
    "/members": ["public"],
    "/events": ["public"]
};

const redirects = {
    '/home': '/'
};

const routesAndRedirects = { routes, redirects };
export default routesAndRedirects;