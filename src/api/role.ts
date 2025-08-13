import { post, get } from '@/http/request';
export const getRoleList = async (params?) => {
    return get({}, '/getRoleList', params);
};
