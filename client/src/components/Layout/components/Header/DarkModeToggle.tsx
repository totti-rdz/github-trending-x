import { useState } from 'react';
import MoonIcon from '../../../icons/MoonIcon';
import SunIcon from '../../../icons/SunIcon';
import { DarkMode } from '../../../../utils/darkModeHelper';

type Props = {};

const DarkModeToggle = ({}: Props) => {
  const [isDarkMode, setIsDarkMode] = useState(DarkMode.isEnabled());

  const handleClick = () => {
    isDarkMode ? DarkMode.disable() : DarkMode.enable();
    setIsDarkMode((current) => !current);
  };

  return (
    <div className="">
      <button
        className="h-10 w-10 overflow-hidden rounded-full border-2 border-purple-600 p-1"
        onClick={handleClick}
        type="button"
      >
        <div className="relative h-full w-full">
          <div
            className={`absolute inset-0 transform transition-transform duration-700 motion-reduce:duration-0 ${
              isDarkMode ? 'rotate-0' : 'rotate-90'
            }`}
            style={{ transformOrigin: '50% 100px' }}
            aria-hidden="true"
          >
            <MoonIcon className="inline" />
          </div>
          <div
            className={`absolute inset-0 transform transition-transform duration-700 ease-in-out motion-reduce:duration-0 ${
              isDarkMode ? '-rotate-90' : 'rotate-0'
            }`}
            style={{ transformOrigin: '50% 100px' }}
            aria-hidden="true"
          >
            <SunIcon className="inline" />
          </div>
        </div>
        <span className="sr-only">
          {`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
        </span>
      </button>
    </div>
  );
};

export default DarkModeToggle;
