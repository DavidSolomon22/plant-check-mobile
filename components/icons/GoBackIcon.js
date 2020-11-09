import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const GoBackIcon = (props) => {
  return (
    <Svg width={14} height={24} viewBox="0 0 14 24" fill="none" {...props}>
      <Path
        d="M.94 10.94a1.5 1.5 0 000 2.12l9.545 9.547a1.5 1.5 0 002.122-2.122L4.12 12l8.486-8.485a1.5 1.5 0 00-2.122-2.121L.94 10.939zM3 10.5H2v3h1v-3z"
        fill="#fff"
      />
    </Svg>
  );
};

export default GoBackIcon;
