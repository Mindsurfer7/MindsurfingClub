// import axios from 'axios';
// import { loginByUsername } from './loginByUsername';
// import { Dispatch } from '@reduxjs/toolkit';
// import { StateScheme } from 'App/providers/StoreProvider';
// import { setAuthData } from 'entities/User/model/slice/userSlice';
// import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';

// // jest.mock('axios');

// // const mockedAxios = jest.mocked(axios, true);

// describe('loginByUsername.test', () => {
//   test('happy login', async () => {
//     const userValue = { username: '134', id: '1' };

//     const thunk = new TestAsyncThunk(loginByUsername);

//     thunk.api.post.mockReturnValue(Promise.resolve({ data: userValue }));

//     const result = await thunk.callThunk({ username: '444', password: 'xxx' });

//     expect(thunk.api.post).toHaveBeenCalled();

//     expect(thunk.dispatch).toHaveBeenCalledWith(setAuthData(userValue));
//     expect(thunk.dispatch).toHaveBeenCalledTimes(3);
//     expect(result.meta.requestStatus).toBe('fulfilled');
//     expect(result.payload).toEqual(userValue);
//   });
//   test('error log', async () => {
//     const userValue = { data: { username: '134', id: '1' } };

//     const thunk = new TestAsyncThunk(loginByUsername);
//     thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
//     const result = await thunk.callThunk({ username: '444', password: 'xxx' });

//     expect(thunk.api.post).toHaveBeenCalled();
//     expect(thunk.dispatch).toHaveBeenCalledTimes(2);
//     expect(result.meta.requestStatus).toBe('rejected');
//     expect(result.payload).toEqual('Wrong password or login');
//   });
// });

// // OLD
// // jest.mock('axios');

// // const mockedAxios = jest.mocked(axios, true);

// // describe('loginByUsername.test', () => {

// //     test('success login', async () => {
// //         const userValue = { username: '123', id: '1' };
// //         mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }));

// //         const thunk = new TestAsyncThunk(loginByUsername);
// //         const result = await thunk.callThunk({ username: '123', password: '123' });

// //         expect(thunk.dispatch).toHaveBeenCalledWith(setAuthData(userValue));
// //         expect(thunk.dispatch).toHaveBeenCalledTimes(3);
// //         expect(mockedAxios.post).toHaveBeenCalled();
// //         expect(result.meta.requestStatus).toBe('fulfilled');
// //         expect(result.payload).toEqual(userValue);
// //     });

// //     test('error login', async () => {
// //         mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));
// //         const thunk = new TestAsyncThunk(loginByUsername);
// //         const result = await thunk.callThunk({ username: '123', password: '123' });

// //         expect(thunk.dispatch).toHaveBeenCalledTimes(2);
// //         expect(mockedAxios.post).toHaveBeenCalled();
// //         expect(result.meta.requestStatus).toBe('rejected');
// //         expect(result.payload).toBe('error');
// //     });
// // });
