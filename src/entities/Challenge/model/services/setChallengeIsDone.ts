import { isDoneObject } from './../../types/ChallengeScheme';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { Participant } from 'entities/Challenge/types/ChallengeScheme';

export const setChallengeIsDone = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('Challenge/setChallengeIsDone', async (challengeID, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  console.log(challengeID);

  const challengeDocRef = doc(GPT_DB, 'challenges', `${challengeID}`);

  try {
    const challenge = await getDoc(challengeDocRef);
    const participants = challenge.data()?.participantsID || [];

    const participantIndex = participants.findIndex(
      (x: Participant) => x.ID === userID,
    );

    if (participantIndex !== -1) {
      const isDoneArray = participants[participantIndex].isDoneArray;

      const currentDate = new Date(); // Get the current date and time
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();

      const formattedToday = new Date(year, month, day); // Create a Date object for today

      console.log(isDoneArray);

      const isDoneIndex = isDoneArray.findIndex(
        (isDoneObj: isDoneObject) =>
          //@ts-ignore
          isDoneObj.date.toDate().toDateString() ===
          formattedToday.toDateString(),
      );

      if (isDoneIndex !== -1) {
        isDoneArray[isDoneIndex].isDone = true;

        await updateDoc(challengeDocRef, {
          participantsID: participants,
        });

        console.log('isDone value updated');
      }
    }
  } catch (error) {
    console.error('Error isDone value updating', error);
  }
});
