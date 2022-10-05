export default {
  registerCoach(context, data) {
    const coachData = {
      id: context.rootGetters.userId,
      firstName: data.firstname,
      lastName: data.lastname,
      description: data.description,
      areas: data.areas,
      hourlyRate: data.rate,
    };

    context.commit('registerCoach', coachData);
  },
};
