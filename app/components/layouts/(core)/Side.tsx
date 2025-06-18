'use client';

import BroswerSide from '../(side)/BroswerSide';
import MobileSide from '../(side)/MobileSide';

const Side = ({ side = false }: { side: boolean }) => {
  return <div>{side ? <MobileSide /> : <BroswerSide />}</div>;
};

export default Side;
