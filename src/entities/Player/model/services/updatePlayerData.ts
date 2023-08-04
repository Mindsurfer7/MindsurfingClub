// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { ThunkConfig } from 'App/providers/StoreProvider';
// import {
//   Firestore,
//   arrayUnion,
//   collection,
//   doc,
//   getDoc,
//   updateDoc,
// } from 'firebase/firestore';
// import { GPT_DB } from 'App/API/firebaseAPI';
// import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

// export const updateMessagesDB = createAsyncThunk<
//   any,
//   string | undefined,
//   ThunkConfig<any>
// >('GPT/updateMessagesDB', async (conversationID, thunkAPI) => {
//   const userID = getGoogleID(thunkAPI.getState());

//   const convDocRef = doc(GPT_DB, 'conversations', `${userID}`);

//   try {
//     const docSnapshot = await getDoc(convDocRef);

//     if (docSnapshot.exists()) {
//       const existingData = docSnapshot.data();
//       console.log(existingData);

//       if (existingData) {
//         const targetDialogIndex = existingData.dialogs.findIndex(
//           (dialog: any) => dialog.ID === conversationID,
//         );
//         if (targetDialogIndex !== -1) {
//           const updatedDialog = {
//             ...existingData.dialogs[targetDialogIndex],
//             messages: messages,
//           };

//           existingData.dialogs.splice(targetDialogIndex, 1, updatedDialog);

//           await updateDoc(convDocRef, {
//             dialogs: existingData.dialogs,
//           });
//         }
//       }
//     }
//   } catch (error) {
//     console.error('Error creating conversation document:', error);
//   }
// });
