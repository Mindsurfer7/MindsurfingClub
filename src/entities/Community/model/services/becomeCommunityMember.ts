import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { onBecomeMember, setNewMember } from '../slice/communitySlice';

export const becomeCommunityMember = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Community/becomeCommunityMember', async (publicID, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const docRef = doc(GPT_DB, 'publics', publicID);

  try {
    await updateDoc(docRef, {
      members: arrayUnion(userID),
    });
    thunkAPI.dispatch(onBecomeMember(userID!));
    console.log('membership applied ');
  } catch (error) {
    console.error('Error creating public', error);
  }
});
