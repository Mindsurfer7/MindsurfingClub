import { createAsyncThunk } from '@reduxjs/toolkit';
import { storage } from 'App/API/firebaseAPI';
import { ThunkConfig } from 'App/providers/StoreProvider';
import axios from 'axios';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
// import { uploadImageProps } from 'entities/uploadImageProps';

export const uploadImage = createAsyncThunk<any, any, ThunkConfig<any>>(
  'xxxx/uploadImage',
  async (payload, thunkAPI) => {
    try {
      const imageRef = ref(
        storage,
        `${payload.path}/${payload.file.name + v4()}`,
      );
      console.log(payload);

      await uploadBytes(imageRef, payload.file);

      const downloadURL = await getDownloadURL(imageRef);
      // if (!response.data) {
      //   throw new Error();
      // }

      return downloadURL;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
