// import React, { Suspense } from 'react';
// import { classNames } from 'shared/lib/classNames/classNames';
// import cls from './LoginModal.module.scss';
// import Modal from 'shared/UI/Modal/Modal';
// import LoginForm from '../LoginForm/LoginForm';
// import { LoginFormAsync } from '../LoginForm/LoginForm.async';
// import Preloader from 'shared/UI/Preloader/Preloader';

// interface LoginModalProps {
//   className?: string;
//   isVisible?: boolean;
//   onClose?: () => void;
// }

// export const LoginModal: React.FC<LoginModalProps> = (props) => {
//   const { className, isVisible, onClose } = props;
//   return (
//     <Modal
//       isVisible={isVisible}
//       onClose={onClose}
//       className={classNames(cls.LoginModal, {}, [className as string])}
//       lazy
//     >
//       <Suspense fallback={<Preloader />}>
//         <LoginFormAsync />
//       </Suspense>
//       {/* <LoginForm /> */}
//     </Modal>
//   );
// };
