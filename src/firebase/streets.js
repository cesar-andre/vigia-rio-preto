import {database} from './setup'

export const create = (rua) => {
    database.collection('streets').add(rua);
}

export const all = () => database.collection('streets').limit(10).get();
export const find = (id) => database.collection('streets').doc(id).get();
export const findByStreetName = (streetName) => {
    
        let strlength = streetName.length;
        let strFrontCode = streetName.slice(0, strlength-1);
        let strEndCode = streetName.slice(strlength-1, streetName.length);

        let startcode = streetName;
        let endcode= strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);


    return database.collection('streets').where("logradouro", ">=", startcode).where("logradouro", "<", endcode).orderBy("logradouro").get();
}