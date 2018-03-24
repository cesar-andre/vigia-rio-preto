import {database} from './setup'

export const all = () => database.collection('periods').get()
export const find = (id) => database.collection('periods').doc(id).get()