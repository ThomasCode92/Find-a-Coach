const FIREBASE_URL =
  'https://vue-find-coach-b80f7-default-rtdb.firebaseio.com/requests';

export default {
  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const response = await fetch(FIREBASE_URL + `/${coachId}.json`);
    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || 'Failed to fetch requests!';
      const error = new Error(errorMessage);

      throw error;
    }

    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message,
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  },
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(FIREBASE_URL + `/${payload.coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || 'Failed to send request!';
      const error = new Error(errorMessage);

      throw error;
    }

    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },
};
