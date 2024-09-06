import InformationService from '../service/InformationService';

export default {
  service_code: {
    exists: {errorMessage: 'Parameter service_code wajib'},
    isString: {errorMessage: 'Parameter service_code tidak sesuai format'},
    custom: {
      options: async (value: string) => {
        const result = await InformationService.getService(value);
        if (!result) {
          return Promise.reject();
        }
      },
      errorMessage: 'Service ataus Layanan tidak ditemukan',
    },
  },
};
