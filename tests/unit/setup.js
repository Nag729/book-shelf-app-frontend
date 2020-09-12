import { config } from '@vue/test-utils';
import Buefy from 'buefy';
import Vue from "vue";

// Buefy components
Vue.use(Buefy, {
  defaultIconPack: 'mdi'
});

// auth0 mock
config.mocks['$auth'] = {
  loading: true,
  isAuthenticated: false,
  user: {},
  auth0Client: null,
  popupOpen: false,
  error: null
}
