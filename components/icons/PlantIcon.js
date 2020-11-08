import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const PlantIcon = (props) => {
  return (
    <Svg width={52} height={44} viewBox="0 0 52 44" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M33.562 17.655c-.39-5.115-2.839-10.102-7.432-13.988-4.637 3.923-7.193 8.91-7.692 13.988 2.774 1.247 5.33 2.86 7.562 4.822 2.232-1.944 4.788-3.557 7.562-4.822zm-7.454-8.14a16.996 16.996 0 012.817 6.197 31.483 31.483 0 00-2.903 1.796 35.454 35.454 0 00-2.882-1.778 17.21 17.21 0 012.968-6.215zM19.37 22.458c2.6 1.577 4.853 3.575 6.63 5.867 4.658-6.013 12.61-9.992 21.667-9.992 0 9.754-7.28 18.004-17.399 21.065a32.245 32.245 0 01-4.268.935 26.772 26.772 0 01-4.268-.935C11.613 36.337 4.333 28.087 4.333 18.333c5.612 0 10.79 1.522 15.015 4.107a13.8 13.8 0 00-.357-.192c-.162-.085-.328-.173-.488-.266.164.106.335.194.504.281.123.063.245.126.363.195zm9.49 13.475a31.02 31.02 0 01-2.882.679 22.214 22.214 0 01-2.773-.66c-7.128-2.164-12.35-7.315-13.975-13.475a24.163 24.163 0 016.76 2.438l-.043.018c.281.165.563.33.845.459l.151.073c2.145 1.32 3.987 2.952 5.439 4.858L26 35.017l3.618-4.675a20.477 20.477 0 015.482-4.877l.152-.092c.195-.091.39-.201.585-.311l-.022-.037a23.823 23.823 0 016.955-2.567c-1.625 6.179-6.825 11.33-13.91 13.475zm-9.468-13.475a.394.394 0 00.086.056c-.043-.019-.065-.037-.086-.055zm-.022-.018s.021 0 .022.018l-.022-.018z"
        fill={props.color}
        fillOpacity={0.5}
      />
    </Svg>
  );
};

export default PlantIcon;
