// import React, { memo, useCallback, useEffect } from 'react';
// import { classNames } from 'shared/lib/classNames/classNames';
// import cls from './LoginForm.module.scss';
// import Button, { ButtonTheme } from 'shared/UI/Button/Button';
// import Input from 'shared/UI/Input/Input';
// import { useDispatch, useSelector, useStore } from 'react-redux';
// import {
//   getLoginError,
//   getLoginIsLoading,
//   getLoginPassword,
//   getLoginUsername,
//   selectLogingState,
// } from 'features/AuthByUsername/model/selectors/selectLoginState/selectLoginState';
// import { loginByUsername } from 'features/AuthByUsername/model/services/LoginByUsername/loginByUsername';
// import { disabled } from 'shared/UI/Button/Button.stories';
// import Text, { TextTheme } from 'shared/UI/Text/Text';
// import { ReduxStoreWithManager } from 'App/providers/StoreProvider';
// import { setPassword, setUsername } from 'features/AuthByUsername';
// import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice';
// import {
//   DynamicModuleLoader,
//   ReducersList,
// } from 'shared/lib/DynamicModuleLoader/DynamicModuleLoader';

// export interface LoginFormProps {
//   className?: string;
// }

// // const initialReducers: ReducersList = {
// //   loginForm: loginReducer,
// // };

// const LoginForm: React.FC<LoginFormProps> = memo(() => {
//   const dispatch = useDispatch();

//   const username = useSelector(getLoginUsername);
//   const password = useSelector(getLoginPassword);
//   const isLoading = useSelector(getLoginIsLoading);
//   const error = useSelector(getLoginError);

//   const onChangeUsername = useCallback(
//     (value: string) => {
//       dispatch(setUsername(value));
//     },
//     [dispatch],
//   );
//   const onChangePassword = useCallback(
//     (value: string) => {
//       dispatch(setPassword(value));
//     },
//     [dispatch],
//   );
//   const onLoginClick = useCallback(() => {
//     dispatch(loginByUsername({ username, password }));

//     //ulbi suggests to use it in fulfilled case:
//     //  const result = await dispatch(loginByUsername({ username, password }));
//     //   if (result.meta.requestStatus === 'fulfilled') {
//     //     onSuccess(); onclose props
//     // but i close modal im other place
//   }, [dispatch, username, password]);

//   useEffect(() => {
//     const handleKeyPress = (event: any) => {
//       if (event.key === 'Enter' && !isLoading) {
//         onLoginClick();
//       }
//     };

//     // Attach the event listener when the component mounts
//     document.addEventListener('keydown', handleKeyPress);

//     // Remove the event listener when the component unmounts
//     return () => {
//       document.removeEventListener('keydown', handleKeyPress);
//     };
//   }, [isLoading, onLoginClick]);

//   return '';
//   //   <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
//   //     <div className={classNames(cls.LoginForm, {}, [className as string])}>
//   //       <Text
//   //         title="Log in your account to use the app"
//   //         theme={TextTheme.PRIMARY}
//   //       />
//   //       <div className={cls.input1}>
//   //         <Input
//   //           className={cls.input}
//   //           type="text"
//   //           value={username}
//   //           placeholder="login"
//   //           onChange={onChangeUsername}
//   //           autoFocus
//   //         />
//   //       </div>
//   //       <div className={cls.input2}>
//   //         <Input
//   //           className={cls.input}
//   //           value={password}
//   //           type="text"
//   //           placeholder="password"
//   //           onChange={onChangePassword}
//   //         />
//   //       </div>
//   //       <div className={cls.bottom}>
//   //         <div className={cls.errorMessage}>
//   //           {error && <Text text={error} theme={TextTheme.ERROR} />}
//   //         </div>

//   //         <Button
//   //           onClick={onLoginClick}
//   //           className={cls.btn}
//   //           theme={ButtonTheme.OUTLINE}
//   //           disabled={isLoading}
//   //         >
//   //           Login
//   //         </Button>
//   //       </div>
//   //     </div>
//   //   </DynamicModuleLoader>
// });

// export default LoginForm;
