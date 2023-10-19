import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getArticleType,
  getArtilcesOrder,
  getArtilcesPageLimit,
  getArtilcesPageNum,
  getArtilcesSearch,
  getArtilcesSort,
} from '../selectors/getArticlesPageData';
import { Article, ArticleType } from 'entities/Article/types/article';

export const requestArticlesFirebaseTEST = createAsyncThunk<
  any,
  any,
  ThunkConfig<any>
>('Articles/requestArticles', async (_, thunkAPI) => {
  const articlesRef = collection(GPT_DB, 'articles');
  const limit = getArtilcesPageLimit(thunkAPI.getState());
  const search = getArtilcesSearch(thunkAPI.getState());
  const sort = getArtilcesSort(thunkAPI.getState());
  const order = getArtilcesOrder(thunkAPI.getState());
  const page = getArtilcesPageNum(thunkAPI.getState());
  const type = getArticleType(thunkAPI.getState());
  try {
    const q = query(
      articlesRef,
      where('type', 'array-contains', type),
      orderBy(sort, order),
    );

    const response = await getDocs(q);

    const articles: Article[] = [];
    response.forEach((doc) => {
      const articleData = doc.data();
      // @ts-ignore
      articles.push(articleData);
    });

    return articles;
  } catch (e) {
    console.log(e);
    return thunkAPI.rejectWithValue('error');
  }
});

// try {
//   const response = await getDocs(articlesRef);

//   const filteredResponse = response.docs.map((doc) => {
//     return {
//       ...doc.data(),
//       id: doc.id,
//     };
//   });

//   if (!response) {
//     throw new Error();
//   }
//   console.log(filteredResponse);

//   return filteredResponse;
// }
