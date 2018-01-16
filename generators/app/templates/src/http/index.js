
import request from './request';
import toLower from 'lodash/toLower';
import bind from 'lodash/bind';
import forEach from 'lodash/forEach';
import _ from 'lodash';

const methods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'];

const http = {
    request
};

forEach(methods, method => {
    if (typeof method !== 'string' || !method.length) {
        return;
    }
    method = toLower(method);
    http[method] = bind(request, null, _, method);
});

export default http;
