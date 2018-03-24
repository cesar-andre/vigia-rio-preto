import {database} from './setup'

export const all = () => database.collection('classification').get()
export const find = (id) => database.collection('classification').doc(id).get()