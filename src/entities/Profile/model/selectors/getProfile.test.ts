// import { getProfileData } from './getProfile';
// import  type{ StateScheme } from 'App/providers/StoreProvider';

// describe('getProfile', () => {
//   test('should return error', () => {
//     const data = {
//       username: 'admin',
//       age: '22',
//       city: 'Moscow',
//     };
//     const state: DeepPartial<StateScheme> = {
//       profile: {
//         data: data,
//       },
//     };
//     expect(getProfileData(state as StateScheme)).toEqual(data);
//   });
//   test('should work with empty state ', () => {
//     const state: DeepPartial<StateScheme> = {};
//     expect(getProfileData(state as StateScheme)).toEqual(undefined);
//   });
// });
