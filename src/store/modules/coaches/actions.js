const FIREBASE_URL =
  'https://vue-find-coach-b80f7-default-rtdb.firebaseio.com/coaches';

export default {
  async loadCoaches(context) {
    const response = await fetch(FIREBASE_URL + '.json');
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || 'Failed to fetch!';
      const error = new Error(errorMessage);

      throw error;
    }

    const coaches = [];

    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        areas: responseData[key].areas,
        hourlyRate: responseData[key].hourlyRate,
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  },
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coachData = {
      firstName: data.firstname,
      lastName: data.lastname,
      description: data.description,
      areas: data.areas,
      hourlyRate: data.rate,
    };

    const response = await fetch(FIREBASE_URL + `/${userId}.json`, {
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
