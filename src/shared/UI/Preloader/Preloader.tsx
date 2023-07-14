import React from "react";
import { classNames } from "shared/lib/classNames/classNames";
import "./preloader.scss";

interface PreloaderProps {
  className?: string;
}

const Preloader: React.FC<PreloaderProps> = ({ className }) => {
  return (
    <div className={classNames("preloader", {}, [className as string])}>
      <div className="loadingio-spinner-gear-d0za66xjisu">
        <div className="ldio-vsta3nr9ws">
          <div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
