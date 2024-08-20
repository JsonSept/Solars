import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense("ORgAjUWIQA/Gnt2VVhhQlFac1pJWnxAYVF2R2FJeVRycl9FYEwgOX1dQl9hSXhTf0RjWX5dcHddTmg")


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

createApp(App).use(store).use(router).mount('#app')
