import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import './preloader.scss';

interface PreloaderProps {
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ className }) => {
  return (
    <div className={classNames('preloader', {}, [className as string])}>
      <div className="loadingio-spinner-interwind-8naw78oq6tf">
        <div className="ldio-f0f55f3e82">
          <div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
            <div>
              <div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style type="text/css"></style>
    </div>
  );
};

export default Preloader;
