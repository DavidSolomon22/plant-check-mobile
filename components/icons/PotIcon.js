import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const PotIcon = (props) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 45 42" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M2 1v11.726h2.744L7.383 41h34.234l2.64-28.274H47V1H2zm37.19 37.656H9.81l-2.42-25.93h34.22l-2.42 25.93zm5.173-28.273H4.637v-7.04h39.726v7.04z"
          fill="#000"
          fillOpacity={0.8}
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h45v42H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default PotIcon;
