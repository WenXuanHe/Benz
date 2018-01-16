import keys from 'lodash/keys';
import isPlainObject from 'lodash/isPlainObject';

/**
 * 添加参数到url
 *
 * @param url
 * @param params
 * @param wrapper
 * @returns {*}
 */
export const addParamsToUrl = (url, params, wrapper = ['', '']) => {
    const keyList = keys(params || {});
    if (!keyList.length) {
        return url;
    }
    const queryArray = keyList
        .filter(key => {
            return params[key] !== null;
        })
        .map(key => {
            const name = wrapper[0] + key + wrapper[1];
            let value = params[key];
            if (Array.isArray(value)) {
                value = value.join(',');
            }
            if (isPlainObject(value)) {
                return addParamsToUrl(null, value, [`${name}[`, `]`]);
            }
            return `${name}=${value}`;
        });
    if (!url || typeof url !== 'string') {
        return queryArray.join('&');
    }
    if (url.indexOf('?') === -1) {
        return url + '?' + queryArray.join('&');
    }

    return url + '&' + queryArray.join('&');
};