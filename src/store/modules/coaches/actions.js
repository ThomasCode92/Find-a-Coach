export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.firstname,
      lastName: data.lastname,
      description: data.description,
      areas: data.areas,
      hourlyRate: data.rate,
    };

    const FIREBASE_URL = `https://vue-find-coach-b80f7-default-rtdb.firebaseio.com/coaches/${userId}.json`;

    const response = await fetch(FIREBASE_URL, {
      method: 'PUT',
      body: JSON.stringify(coachData),
    });

    if (!response.ok) {
      // error...
    }

    const responseData = await response.json();

    context.commit('registerCoach', {
      ...responseData,
      id: userId,
    });
  },
};
