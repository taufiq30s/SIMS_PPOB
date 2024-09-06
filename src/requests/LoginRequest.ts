export default {
  email: {
    exists: {errorMessage: 'Parameter email wajib'},
    isEmail: {errorMessage: 'Parameter email tidak sesuai format'},
    toLowerCase: true,
    matches: {
      options:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorMessage: 'Parameter email tidak sesuai format',
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
