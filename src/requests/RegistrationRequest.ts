import MembershipService from '../service/MembershipService';

export default {
  first_name: {
    exists: {errorMessage: 'Parameter First name wajib'},
    isString: {errorMessage: 'Parameter First name tidak sesuai format'},
  },
  last_name: {
    optional: true,
    isString: {errorMessage: 'Parameter Last name tidak sesuai format'},
  },
  email: {
    exists: {errorMessage: 'Parameter email wajib'},
    isEmail: {errorMessage: 'Parameter email tidak sesuai format'},
    toLowerCase: true,
    matches: {
      options:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMessage: 'Parameter email tidak sesuai format',
    },
    custom: {
      options: async (value: string) => {
        const result = await MembershipService.isEmailExists(value);
        if (result) {
          return Promise.reject();
        }
      },
      errorMessage: 'Email sudah terdaftar',
    },
  },
  password: {
    exists: {errorMessage: 'Parameter Password wajib diisi'},
    isString: {errorMessage: 'Parameter Password tidak sesuai format'},
    isLength: {
      options: {min: 8},
      errorMessage:
        'Parameter Password mesti terdiri dari 8 karakter atau lebih',
    },
  },
};
