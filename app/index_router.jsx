import { element, renderOn, listeningTo, dispatch } from 'morphonent'
const m = element

function matchPath(route, currentRoute, fn) {
    const parts = route.split('/');
    const currentRouteParts = currentRoute.split('/');

    if (parts.length !== currentRouteParts.length) {
        return undefined;
    }

    const params = {};

    for (let i = 0; i < parts.length; i++) {
        if (parts[i][0] === ':') {
            params[parts[i].substring(1)] = currentRouteParts[i];
        }
    }

    return (state) => {
        return fn(params, state);
    }
}

function routing(routes, notFound = routes['/'], currentRoute = routes['/'] || notFound, initialState = {}) {
    if (currentRoute === undefined) {
        const routeSet = Object.entries(routes)
        const newPath = location.pathname

        for (let i = 0; i < routeSet.length; i++) {
            const route = routeSet[i][0];
            const delegate = matchPath(route, newPath, routeSet[i][1]);
            if (delegate) {
                return routing(routes, notFound, delegate(initialState));
            }
        }
    }

    return listeningTo({ '__browserPathChanged': ({newPath, state}) => {
        const routeSet = Object.entries(routes)
        for (let i = 0; i < routeSet.length; i++) {
            const route = routeSet[i][0];
            const delegate = matchPath(route, newPath, routeSet[i][1]);
            if (delegate) {
                window.history.pushState(undefined, route.title, newPath)
                return routing(routes, notFound, delegate(state));
            }
        }
        
        return notFound;
    }}, currentRoute || notFound)
}

function navigateTo(link, state) {
    dispatch('__browserPathChanged', { newPath: link, state })
}

const index = () => m('a', { onclick: () => navigateTo('/profile/Kevin/', { mood: 'happy' }) }, 'Go to Profile');
const profile = ({ name }, { mood }) => m('button', { onclick: () => navigateTo('/') }, name, ' - Go to Index - ', mood);

window.onload = function () {
    renderOn('body', routing({
        '/': index,
        '/profile/:name/': profile
    }));
}