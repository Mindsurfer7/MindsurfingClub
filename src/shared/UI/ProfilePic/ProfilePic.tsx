import React, { CSSProperties, useMemo } from 'react';
import { Mods, classNames } from 'shared/lib/classNames/classNames';
import cls from './ProfilePic.module.scss';

interface ProfilePicProps {
  className?: string;
  src?: string;
  size?: number;
}

const ProfilePic: React.FC<ProfilePicProps> = ({ className, src, size }) => {
  const mods: Mods = {};

  const styles = useMemo<CSSProperties>(() => {
    return {
      width: size || 100,
      height: size || 100,
    };
  }, [size]);

  return (
    <img
      src={src}
      alt="zero image"
      style={styles}
      className={classNames(cls.ProfilePic, mods, [className])}
    />
  );
};

export default ProfilePic;
