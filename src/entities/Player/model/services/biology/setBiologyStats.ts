import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { Biology } from 'entities/Player/UI/PlayerCard/Character/types';

export const setBiologyStats = createAsyncThunk<
  void,
  Biology,
  ThunkConfig<any>
>('Player/setBiologyStats', async (stats, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const DocRef = doc(GPT_DB, 'biology', `${userID}`);

  // const newBio = {
  //   levels: {
  //     cortisol: 65,
  //     melatonin: 15,
  //     serotonin: 70,
  //     dopamine: 55,
  //     adrenaline: 35,
  //     norepinephrine: 40,
  //     endorphins: 45,
  //     growth_hormone: 20,
  //     testosterone: 65,
  //     estrogen: 50,
  //     oxytocin: 50,
  //     insulin: 20,
  //   },
  //   changes: {
  //     cortisol: -13.33,
  //     melatonin: 50,
  //     serotonin: 16.67,
  //     dopamine: 10,
  //     adrenaline: -12.5,
  //     norepinephrine: -11.11,
  //     endorphins: 50,
  //     growth_hormone: 0,
  //     testosterone: 0,
  //     estrogen: 0,
  //     oxytocin: 25,
  //     insulin: 0,
  //   },
  // };

  try {
    //@ts-ignore
    await updateDoc(DocRef, stats);

    console.log('biology has been set');
  } catch (error) {
    console.error('Error settin bio', error);
  }
});
