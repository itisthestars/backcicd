import { post, get } from '@/http/request';
export const getAuthList = async (params?) => {
    return get({}, '/getAuthList', params);
};
