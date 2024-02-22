import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  Query,
} from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import {
  getArticleType,
  getArticleViewType,
  getArtilcesOrder,
  getArtilcesPageLimit,
  getArtilcesPageNum,
  getArtilcesSearch,
  getArtilcesSort,
  getLastDocSnapshot,
} from '../selectors/getArticlesPageData';
import { Article, ArticleType } from 'entities/Article/types/article';
import { setHasMore, setLastDocSnapshot } from '../slice/articlePageSlice';

export const requestArticlesFirebaseTEST = createAsyncThunk<
  any,
  any,
  ThunkConfig<any>
>('Articles/requestArticles', async (_, thunkAPI) => {
  console.log('requestArticlesFirebaseTEST', _);

  const articlesRef = collection(GPT_DB, 'articles');
  // const limit = getArtilcesPageLimit(thunkAPI.getState()); ////// ATTENTION IT SHOULDNT BE COMMENTED
  const search = getArtilcesSearch(thunkAPI.getState());
  const sort = getArtilcesSort(thunkAPI.getState());
  const order = getArtilcesOrder(thunkAPI.getState());
  const page = getArtilcesPageNum(thunkAPI.getState());
  const type = getArticleType(thunkAPI.getState());
  const lastDocSnapshot = getLastDocSnapshot(thunkAPI.getState());
  const viewType = getArticleViewType(thunkAPI.getState());

  //чтобы понять с какого документа начинать, надо в стейт поместить реф на ласт и стартАфтер(реф)
  const actualLimit = viewType === 'square' ? 4 : 2;

  try {
    let q: Query;

    if (lastDocSnapshot) {
      // если скролл до дна уже был и есть снимок последнего документа
      q = query(
        articlesRef,
        where('type', 'array-contains', type),
        orderBy(sort, order),
        limit(actualLimit),
        startAfter(lastDocSnapshot),
      );
    } else {
      // если страница впервые загружена и снимок документа null
      q = query(
        articlesRef,
        where('type', 'array-contains', type),
        orderBy(sort, order),
        limit(actualLimit),
      );
    }

    const response = await getDocs(q);

    const lastDoc = response.docs[response.docs.length - 1];

    thunkAPI.dispatch(setLastDocSnapshot(lastDoc)); //setting the last doc to use the startAfter() method

    const articles: Article[] = [];
    response.forEach((doc) => {
      const articleData = doc.data();
      // @ts-ignore
      articles.push(articleData);
    });
    console.log(`${articles.length} < ${actualLimit}`);

    const hasMore = articles.length < actualLimit ? false : true;
    thunkAPI.dispatch(setHasMore(hasMore));

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
