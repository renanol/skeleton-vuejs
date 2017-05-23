import { isFunction } from 'lodash'
import { vuex as Auth } from './auth'

const vuex = { Auth }
const keys = Object.keys(vuex)

const modules = keys.reduce((acc, key) => ({ ...acc, [key]: vuex[key].module }), {})
const plugins = keys.reduce((acc, key) => [...acc, vuex[key].plugin], []).filter(isFunction)

export default { modules, plugins }
