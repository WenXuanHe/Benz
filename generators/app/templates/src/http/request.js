import 'whatwg-fetch';
import utils from '$utils';
import toUpper from 'lodash/toUpper';

const request = (url, method = 'GET', data = {}, headers = {}) => {
    let body;
    method = toUpper(method);

    headers = Object.assign({
        'Content-Type': 'application/json'
    }, headers);

    if (FormData && data instanceof FormData) {
        delete headers['Content-Type'];
    }

    if (method === 'GET') {
        url = utils.addParamsToUrl(url, data);
    } else {
        body = data;
        if (headers['Content-Type'] === 'application/json') {
            body = JSON.stringify(data);
        }
    }

    return Promise.resolve(fetch(url, {
        method,
        body,
        headers
    }))
        .then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        })
        .then((response) => {
            return response.json();
        })
        .catch(function(error) {
            throw error;
        });
};

export default request;
