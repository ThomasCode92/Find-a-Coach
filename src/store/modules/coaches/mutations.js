export default {
  setCoaches(state, payload) {
    state.coaches = payload;
  },
  registerCoach(state, payload) {
    state.coaches.push(payload);
  },
};
