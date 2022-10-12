const FIREBASE_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const FIREBASE_API_KEY = 'AIzaSyAUajXj2o2O2m54aE_qLF6kzzzduzxEqfw';

export default {
  async signup(context, payload) {
    const FIREBASE_URL = FIREBASE_BASE_URL + `:signUp?key=${FIREBASE_API_KEY}`;

    const response = await fetch(FIREBASE_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || 'Failed to authenticate!';
      const error = new Error(errorMessage);

      throw error;
    }

    console.log(responseData);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  async login(context, payload) {
    const FIREBASE_URL =
      FIREBASE_BASE_URL + `:signInWithPassword?key=${FIREBASE_API_KEY}`;

    const response = await fetch(FIREBASE_URL, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const errorMessage = responseData.message || 'Failed to authenticate!';
      const error = new Error(errorMessage);

      throw error;
    }

    console.log(responseData);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
};
