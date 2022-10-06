export default {
  requests(state, getters, rootState, rootGetters) {
    const coachId = rootGetters.userId;
    const requests = state.requests.filter(
      request => request.coachId === coachId
    );

    return requests;
  },
  hasRequests(state, getters) {
    return getters.requests && getters.requests.length > 0;
  },
};
