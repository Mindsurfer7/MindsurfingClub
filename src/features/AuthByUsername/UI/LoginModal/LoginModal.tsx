import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './LoginModal.module.scss';
import Modal from 'shared/UI/Modal/Modal';
import LoginForm from '../LoginForm/LoginForm';

interface LoginModalProps {
  className?: string;
  isVisible?: boolean;
  onClose?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = (props) => {
  const { className, isVisible, onClose } = props;
  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      className={classNames(cls.LoginModal, {}, [className as string])}
      lazy
    >
      <LoginForm />
    </Modal>
  );
};

export default LoginModal;
