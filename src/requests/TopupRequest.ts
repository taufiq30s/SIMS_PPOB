export default {
  top_up_amount: {
    exists: {errorMessage: 'Parameter top_up_amount wajib'},
    isInt: {
      min: 0,
      errorMessage:
        'Paramter amount hanya boleh angka dan tidak boleh lebih kecil dari 0',
    },
  },
};
