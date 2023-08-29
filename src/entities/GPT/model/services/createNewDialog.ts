import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';
import { dialogPayload } from 'pages/PsyRoom/UI/PsyRoom';
import { getMessages } from '../selectors/getGPTdata';

export const createNewDialog = createAsyncThunk<
  any,
  dialogPayload,
  ThunkConfig<any>
>('GPT/createNewDialog', async (payload, thunkAPI) => {
  const userID = getGoogleID(thunkAPI.getState());
  const convDocRef = doc(GPT_DB, 'conversations', `${userID}`);

  const newDialog = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content:
          'Ты - виртуальный ассистент для приложения Mindsurfing Club. Это приложение для геймификации дел и привычек, где у пользователя есть свой персонаж и уровень, и чтобы его прокачивать, надо выполнять дела и прививать привычки, а также учавствовать  в коллективных событиях с другими юзерами. В приложении есть возможность создавать испытания, в которых могут принимать участие все, кто состоит в клубе, которому принадлежит исптытание. Чтобы отметить, что ты сегодня выполнил испытание, надо перейти во вкладку Менеджер задач и выбрать испытания. Первым сообщением кратко опиши для пользователя, что есть в приложении и зачем оно.',
      },
    ],
    dialogName: payload.name,
    ID: payload.ID,
  };

  try {
    await updateDoc(convDocRef, {
      dialogs: arrayUnion(newDialog),
    });
    console.log('Document created');
  } catch (error) {
    console.error('Error creating conversation document:', error);
  }
});
