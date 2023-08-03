import { getGoogleIsLogged } from './model/selectors/getGoogleProfile';
import { GoogleProfile } from 'entities/GoogleProfile/types/GoogleProfile';
import { setAccount, logoutAccount } from './model/slice/GoogleProfileSlice';
export { GoogleProfile, setAccount, logoutAccount, getGoogleIsLogged };
