function useBody(method) {
    switch (method) {
        case 'POST':
        case 'PUT':
        case 'PATCH':
            return true;
        default:
            return false;
    }
}

export const genericRequest = async (url, method, body) => {
    let fetchOpts = {
        method: method,
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
    }
    if (useBody(method)) {
        fetchOpts['body'] = JSON.stringify(body)
    }
    let response = await fetch(url, fetchOpts);
    return {
        ok: response.ok,
        status: response.status,
        body: await response.json()
    };
}
