export function launchApi(http) {
    return {
        get: (q) => {
            return http.get(q);
        },
    };
}