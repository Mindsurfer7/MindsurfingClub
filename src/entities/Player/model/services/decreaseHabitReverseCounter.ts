import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { requestHabits } from './requestHabits';

// ======================================== !!! ATTENTION OPTIMISATIION !!! ==============================================================

// Формируем объект с путем к полю, которое нужно обновить, и его новым значением
//  const updateData = {
// [`habits.${elementIndex}.count`]: habits[elementIndex].count,
//   };
// Обновляем только одно поле в документе
//   await updateDoc(playerDocRef, updateData);
// }9e5a74e5-5aa2-451a-80b9-3022f22c058

//В ДАННЫЙ МОМЕНТ КОГДА Я КЛИКАЮ ПО КНОПКЕ ТО В БАЗЕ ДАННЫХ СНИЖАЕТСЯ НА 25 НО ОТОБРАЖАЕТСЯ
// ТОЛЬКО СТАРОЕ ЧИСЛО, ТО ЕСТЬ НАДО ОБНОВЛЯТЬ СТРАНИЦУ ДЛЯ НОВЫХ ДАННЫХ...

interface ReverseCountPayload {
  taskID: string;
  step: number;
}

export const decreaseHabitReverseCounter = createAsyncThunk<
  ReverseCountPayload,
  any,
  ThunkConfig<any>
>('Player/decreaseHabitReverseCounter', async ({ taskID, step }, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());

  const playerDocRef = doc(GPT_DB, 'accounts', `${userID}`);

  try {
    const playerDoc = await getDoc(playerDocRef);
    const habits = playerDoc.data()?.habits || [];

    const elementIndex = habits.findIndex((x: any) => x.id === taskID);

    console.log({
      taskId: taskID,
      step: step,
      habits: habits,
      index: elementIndex,
    });

    if (
      elementIndex !== -1 &&
      habits[elementIndex].subtype === 'reverse-count'
    ) {
      habits[elementIndex].count = habits[elementIndex].count - step;

      await updateDoc(playerDocRef, {
        habits: habits,
      });

      console.log('decrease Habit Reverse Counter success ');
      thunkAPI.dispatch(requestHabits());

      return { taskID, step };
    }
  } catch (error) {
    console.error('Error decreaseHabitReverseCounter ', error);
  }
});
