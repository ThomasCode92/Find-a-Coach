import { createStore } from 'vuex';

import authModule from './modules/auth';
import coachesModule from './modules/coaches';
import requestsModule from './modules/requests';

const store = createStore({
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});

export default store;
