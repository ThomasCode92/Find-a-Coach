const FIREBASE_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const FIREBASE_API_KEY = 'AIzaSyAUajXj2o2O2m54aE_qLF6kzzzduzxEqfw';

export default {
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;

    let firebaseUrl =
      FIREBASE_BASE_URL + `:signInWithPassword?key=${FIREBASE_API_KEY}`;

    if (mode === 'signup') {
      firebaseUrl = FIREBASE_BASE_URL + `:signUp?key=${FIREBASE_API_KEY}`;
    }

    const response = await fetch(firebaseUrl, {
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

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
        tokenExpiration: null,
      });
    }
  },
  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
