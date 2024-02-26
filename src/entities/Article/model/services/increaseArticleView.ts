import { ThunkConfig } from 'App/providers/StoreProvider';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GPT_DB } from 'App/API/firebaseAPI';
import axios from 'axios';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';

interface Args {
  articleID: string;
  userID: string;
}

export const increaseArticleView = createAsyncThunk<void, Args, ThunkConfig<unknown>>('Article/increaseArticleView', async (args, thunkAPI) => {
  try {
    const artRef = collection(GPT_DB, 'articles');

    const documentRef = doc(artRef, args.articleID);

    const docSnapshot = await getDoc(documentRef);

    const viewersField = docSnapshot?.data()?.viewers;

    if (viewersField) {
      if (viewersField && new Set(viewersField).has(args.userID)) {
        return;
      } else {
        await updateDoc(documentRef, {
          viewers: [...viewersField, args.userID],
        });
      }
    } else {
      await updateDoc(documentRef, {
        viewers: [args.userID],
      });
    }
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue({ msg: 'error', e });
  }
});
