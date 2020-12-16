import { User } from 'src/app/shared/models/user';

export interface UserState {
  user: User;
  isAuthenticated: boolean;
}

export const initialUserState: UserState = {
  user: null,
  isAuthenticated: false
};
