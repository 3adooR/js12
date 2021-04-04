import {createStore} from 'vuex'

export default createStore({
    state: () => ({
        duration: 7,
        complexity: 5,
        cfgSum: true,
        cfgDiff: true,
        cfgMulti: true,
        cfgDiv: true,
    })
})