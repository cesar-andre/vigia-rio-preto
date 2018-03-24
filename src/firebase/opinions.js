import {database} from './setup'

export const create = (opiniao) => {
    database.collection('opinions').add(opiniao);
}

export const edit = (id, opiniao) => {
    database.collection('opinions').doc(id).set(opiniao);
}

export const all = () => database.collection('opinions').get();
export const find = (id) => database.collection('opinions').doc(id).get();
export const findByUser = (idUser) => database.collection('opinions').where("user", "==", idUser).get();
export const del = (id) => database.collection('opinions').doc(id).delete();