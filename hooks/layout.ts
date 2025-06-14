import { useState } from 'react';

export const useLayout = () => {
  const [basic, setBasic] = useState<boolean>(true);

  const handleClick = () => {
    setBasic(!basic);
  };

  return { basic, handleClick };
};
