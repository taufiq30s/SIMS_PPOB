// export default {
//   file: {
//     custom: {
//       options: (value: string, {req}: {req: any}) => {
//         const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
//         console.log(req.file);
//         if (!req.file) {
//           return Promise.reject();
//         } else if (!imageRegex.test(req.file.originalname)) {
//           return Promise.reject();
//         } else {
//           return Promise.resolve();
//         }
//       },
//       errorMessage: 'Format Image tidak sesuai',
//     },
//   },
// };

// import {body} from 'express-validator';

// const validationProfileImage = {
//   body: [
//     body('file')
//       .notEmpty()
//       .withMessage('Parameter File Wajib')
//       .custom((value, {req}) => {
//         if (!req.file) {
//           throw new Error('No file uploaded');
//         }

//         const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
//         const fileName = req.file.originalname;

//         if (!imageRegex.test(fileName)) {
//           throw new Error('Invalid image format');
//         }

//         return true;
//       }),
//   ],
// };

// export default validationProfileImage;

import {body} from 'express-validator';

// Define validation schema
export const validationProfileImage = [
  body('file').custom((value, {req}) => {
    // Ensure file is present
    if (!req.file) {
      throw new Error('No file uploaded');
    }

    // Regex for validating image file extensions
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
    const fileName = req.file.originalname;

    if (!imageRegex.test(fileName)) {
      throw new Error('Invalid image format');
    }

    return true;
  }),
];
