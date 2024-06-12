import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { getTaskTrackerData } from 'entities/TaskTracker/model/selectors/getTaskTrackerData';

interface PrinciplePayload {
  name: string;
  description: string;
}

export const createNewPrinciple = createAsyncThunk<
  any,
  PrinciplePayload,
  ThunkConfig<any>
>('TaskTracker/createNewPrinciple', async (payload, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const trackerData = getTaskTrackerData(thunkAPI.getState());

  const DocRef = doc(GPT_DB, 'principles', `${userID}`);

  const newPrinciple = {
    name: payload.name,
    description: payload.description,
  };

  try {
    await updateDoc(DocRef, {
      myPrinciples: arrayUnion(newPrinciple),
    });
    // request ,y priciples
    //   await thunkAPI.dispatch(requestTodayTasks());

    console.log('new Principle created');
  } catch (error) {
    console.error('Error creating new Principle', error);
  }
});
