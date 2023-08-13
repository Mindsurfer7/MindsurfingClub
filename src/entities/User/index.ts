import { getUserAuthData, getUserInited } from './model/selectors/getUsername';
import { getUsername } from 'entities/User/model/selectors/getUsername';
import { User, UserScheme } from './model/types/user';
export { userReducer, userSlice } from './model/slice/userSlice';

//didnt export actions

export { UserScheme, User, getUsername, getUserAuthData, getUserInited };
