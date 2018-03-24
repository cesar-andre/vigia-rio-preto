import {database} from './setup'

export const create = (ranking) => {
    database.collection('rankings').add(ranking);
}

export const edit = (id, ranking) => {
    database.collection('rankings').doc(id).set(ranking);
}

export const all = () => database.collection('rankings').get();
export const find = (id) => database.collection('rankings').doc(id).get();
export const del = (id) => database.collection('rankings').doc(id).delete();

export const findByStreet = (street) => database.collection('rankings').where("street", "==", street).get();