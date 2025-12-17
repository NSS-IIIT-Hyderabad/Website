const routes = {
    "/members": ["public"],
    "/events": ["public"]
};

const redirects = {
    '/home': '/'
};

const routesNredirects = { routes, redirects };
export default routesNredirects;