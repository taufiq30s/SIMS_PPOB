export default {
  first_name: {
    exists: {errorMessage: 'Parameter First name wajib'},
    isString: {errorMessage: 'Parameter First name tidak sesuai format'},
  },
  last_name: {
    optional: true,
    isString: {errorMessage: 'Parameter Last name tidak sesuai format'},
  },
};
