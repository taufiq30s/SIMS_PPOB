import {Router} from 'express';
import {checkSchema} from 'express-validator';
import RegistrationRequest from '../requests/RegistrationRequest';
import LoginRequest from '../requests/LoginRequest';
import MembershipController from '../controllers/MembershipController';
import AuthenticationMiddleware from '../middlewares/AuthenticationMiddleware';
import UpdateProfileRequest from '../requests/UpdateProfileRequest';
import {upload} from '../middlewares/FileMiddleware';
import {validationProfileImage} from '../requests/UpdateProfileImageRequest';

export const membershipRoute = Router();

// Implement some paths with auth middleware
membershipRoute.use(
  ['/profile', '/profile/update', '/profile/image'],
  AuthenticationMiddleware()
);

membershipRoute.post(
  '/registration',
  checkSchema(RegistrationRequest),
  MembershipController.registration
);

membershipRoute.post(
  '/login',
  checkSchema(LoginRequest),
  MembershipController.login
);

membershipRoute.get('/profile', MembershipController.getProfile);

membershipRoute.put(
  '/profile/update',
  checkSchema(UpdateProfileRequest),
  MembershipController.update
);

membershipRoute.put(
  '/profile/image',
  upload.single('file'),
  validationProfileImage,
  MembershipController.updateProfileImage
);
