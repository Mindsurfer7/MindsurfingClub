import { isDoneObject } from './../../types/ChallengeScheme';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  arrayUnion,
  doc,
  getDoc,
  runTransaction,
  updateDoc,
} from 'firebase/firestore';
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
    const participants = challenge.data()?.participants || [];
    const pointsToIncrease = challenge.data()?.points;

    const participantIndex = participants.findIndex(
      (x: Participant) => x.ID === userID,
    );

    if (participantIndex !== -1) {
      const isDoneArray = participants[participantIndex].isDoneArray;
      const userPoints = participants[participantIndex].points;

      const currentDate = new Date(); // Get the current date and time
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const day = currentDate.getDate();

      const formattedToday = new Date(year, month, day); // Create a Date object for today

      const isDoneIndex = isDoneArray.findIndex(
        (isDoneObj: isDoneObject) =>
          //@ts-ignore
          isDoneObj.date.toDate().toDateString() ===
          formattedToday.toDateString(),
      );

      if (isDoneIndex !== -1) {
        isDoneArray[isDoneIndex].isDone = true;

        const newPoints = userPoints + (pointsToIncrease || 0);

        const updatedParticipants = participants.map(
          (participant: Participant, idx: number) =>
            idx === participantIndex
              ? { ...participant, isDoneArray, points: newPoints }
              : participant,
        );

        await updateDoc(challengeDocRef, {
          participants: updatedParticipants,
        });
      }
    }
  } catch (error) {
    console.error('Error isDone value updating', error);
  }
});
