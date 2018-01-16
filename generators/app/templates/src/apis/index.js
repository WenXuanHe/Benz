// import http from '$http';

export const getCount = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                count: 100
            });
        }, 1000);
    });
};

export const increaseCount = (count) => {
    return new Promise((resolve, reject) => {
        count += 1;
        setTimeout(() => {
            resolve({
                count: count
            });
        }, 1000);
    });
};

export const encreaseCount = (count) => {
    return new Promise((resolve, reject) => {
        count -= 1;
        setTimeout(() => {
            resolve({
                count: count
            });
        }, 1000);
    });
};

export default{
    getCount,
    increaseCount,
    encreaseCount
};