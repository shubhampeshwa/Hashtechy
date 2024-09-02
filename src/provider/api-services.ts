import API, { ApiMethodType } from './api-config';


/**
 * get Character List
 * @returns Api Response
 */
export const getCharater = async (params:{page:number}) => {
    return new Promise(async (resolve, reject) => {
        const res = await API.request<any, any>(
            `?results=25&page=${params.page}`,
            ApiMethodType.get,
            
        );
        console.log("respone11==>", res)
        if (res.code == 200) {
            console.log("resp==>",res)
            resolve(res.data);
        }
        resolve({});
    });
};

