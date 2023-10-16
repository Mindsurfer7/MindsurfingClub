import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { queryUsernameByID } from 'entities/Player';

export const requestCommentsByArticleID = createAsyncThunk<
  any,
  string,
  ThunkConfig<any>
>('ArticleComments/requestCommentsByArticleID', async (articleID, thunkAPI) => {
  const commentsRef = collection(GPT_DB, 'ArticleComments');

  try {
    const q = query(commentsRef, where('articleID', '==', articleID));
    const response = await getDocs(q);
    const comments = [];

    for (const doc of response.docs) {
      const commentData = doc.data();
      const userID = commentData.userID;

      // Fetch username for the current user ID
      const usernameResponse = await thunkAPI.dispatch(
        queryUsernameByID(userID),
      );

      console.log(usernameResponse);

      // Assuming your queryUsernameByID thunk returns an array, get the first item
      const username = usernameResponse ? usernameResponse.payload : 'Unknown';

      // Replace user ID with username in the comment data
      const commentWithUsername = {
        ...commentData,
        username,
      };

      comments.push(commentWithUsername);
    }

    console.log(comments);

    return comments;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});
