import { post, get } from '@/http/request';
export const getProject = async (params) => {
    return get({}, '/projects', params);
};
