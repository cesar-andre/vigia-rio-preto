import {database} from './setup'

export const create = (id, usuario) => {
    database.collection('users').doc(id).set(usuario);
}

export const all = () => database.collection('users').get()

export const find = (id) => database.collection('users').doc(id).get()