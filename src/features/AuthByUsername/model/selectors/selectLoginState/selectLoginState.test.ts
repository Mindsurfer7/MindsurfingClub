// import {
//   getLoginError,
//   getLoginIsLoading,
//   getLoginPassword,
//   getLoginUsername,
// } from './selectLoginState';
// import { StateScheme } from 'App/providers/StoreProvider';

// describe('getLoginError', () => {
//   test('should return error', () => {
//     const state: DeepPartial<StateScheme> = {
//       loginForm: {
//         username: '',
//         password: '',
//         isLoading: false,
//         error: 'error',
//       },
//     };
//     expect(getLoginError(state as StateScheme)).toEqual('error');
//   });
//   test('should work with empty state ', () => {
//     const state: DeepPartial<StateScheme> = {};
//     expect(getLoginError(state as StateScheme)).toEqual(undefined);
//   });
// });

// describe('getLoginPassword', () => {
//   test('should return value', () => {
//     const state: DeepPartial<StateScheme> = {
//       loginForm: {
//         username: '',
//         password: 'xxxx',
//         isLoading: false,
//         error: '',
//       },
//     };
//     expect(getLoginPassword(state as StateScheme)).toEqual('xxxx');
//   });
//   test('should work with empty state ', () => {
//     const state: DeepPartial<StateScheme> = {};
//     expect(getLoginPassword(state as StateScheme)).toEqual('');
//   });
// });

// describe('getLoginUsername', () => {
//   test('should return value', () => {
//     const state: DeepPartial<StateScheme> = {
//       loginForm: {
//         username: 'Mindsurfer',
//         password: '',
//         isLoading: false,
//         error: '',
//       },
//     };
//     expect(getLoginUsername(state as StateScheme)).toEqual('Mindsurfer');
//   });
//   test('should work with empty state ', () => {
//     const state: DeepPartial<StateScheme> = {};
//     expect(getLoginUsername(state as StateScheme)).toEqual('');
//   });
// });

// describe('getLoginIsLoading', () => {
//   test('should return true', () => {
//     const state: DeepPartial<StateScheme> = {
//       loginForm: {
//         username: 'Mindsurfer',
//         password: '',
//         isLoading: true,
//         error: '',
//       },
//     };
//     expect(getLoginIsLoading(state as StateScheme)).toEqual(true);
//   });
//   test('should work with empty state ', () => {
//     const state: DeepPartial<StateScheme> = {};
//     expect(getLoginIsLoading(state as StateScheme)).toEqual(false);
//   });
// });
