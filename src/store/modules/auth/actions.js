const FIREBASE_BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const FIREBASE_API_KEY = 'AIzaSyAUajXj2o2O2m54aE_qLF6kzzzduzxEqfw';

let timer;

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

    const expiresIn = parseInt(responseData.expiresIn) * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userId: responseData.localId,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('tokenExpiration');

    const expiresIn = parseInt(expirationDate) - new Date().getTime();

    if (expiresIn < 10000) return;

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
