import state from './states';
import mutations from './mutations';
import plugin from './plugin';
import * as getters from './getters';
import * as actions from './actions';

const module = { state, mutations, actions, getters };

export default { module, plugin };
