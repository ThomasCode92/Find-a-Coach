import { createApp, defineAsyncComponent } from 'vue';
import router from './router';

import App from './App.vue';
import BaseCard from './components/base/BaseCard.vue';
import BaseButton from './components/base/BaseButton.vue';
import BaseBadge from './components/base/BaseBadge.vue';
import BaseSpinner from './components/base/BaseSpinner.vue';

import store from './store';

const app = createApp(App);

const BaseDialog = defineAsyncComponent(() =>
  import('./components/base/BaseDialog.vue')
);

app.use(router);
app.use(store);

app.component('base-card', BaseCard);
app.component('base-button', BaseButton);
app.component('base-badge', BaseBadge);
app.component('base-spinner', BaseSpinner);
app.component('base-dialog', BaseDialog);

app.mount('#app');
