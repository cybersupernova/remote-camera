import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate';
import { required, min } from 'vee-validate/dist/rules';

extend('required', {
	...required,
	message: '{_field_} is required'
});

extend('min', {
	...min,
	params: ['length'],
	message: '{_field_} must be {length} characters'
});

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);