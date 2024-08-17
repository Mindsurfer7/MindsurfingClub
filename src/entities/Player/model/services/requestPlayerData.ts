import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { toast } from 'react-toastify';

export const requestPlayerData = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/requestPlayerData',
  async (_, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());

    if (!userID) {
      return thunkAPI.rejectWithValue('User ID is not available');
    }

    const playerDocRef = doc(GPT_DB, 'accounts', userID); // Получаем ссылку на документ по ID

    try {
      const docSnapshot = await getDoc(playerDocRef); // Получаем документ по ID

      // Если документ не существует, возвращаем new: true и это попадает в редакс
      if (!docSnapshot.exists()) {
        return { new: true };
      }

      const playerData = docSnapshot.get('Player'); // Получаем только поле Player

      console.log(playerData);

      if (!playerData) {
        return thunkAPI.rejectWithValue('Player field not found');
      }

      return playerData;
    } catch (e) {
      console.log(e);
      toast.error(`Ошибка загрузки, перезагрузите страницу :(`, {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return thunkAPI.rejectWithValue('error requesting player data');
    }
  },
);
