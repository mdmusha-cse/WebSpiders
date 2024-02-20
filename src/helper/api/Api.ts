import constants from "../constants/Constants";

export async function getApi(url :any) {

    const resp = await fetch(`${constants.base_url}/${url}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    });
    const data = await resp.json();
    return data;
}

export async function postApiWithHeader(url :any, payload :any) {
    
    try {
        const access_token = 'hidromas-we-app-01~c^Dt0Oc32';

        const resp = await fetch(`${constants.base_url}/${url}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'apikey': access_token,
            },
            body: JSON.stringify(payload),
        });

        const data = await resp.json();
        return data;
    }
    catch (e) {

    }
}