import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const ProfileIcon = (props) => {
  return (
    <Svg width={52} height={44} viewBox="0 0 47 52" fill="none" {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.5 8.667c-4.328 0-7.833 3.878-7.833 8.666 0 4.789 3.505 8.667 7.833 8.667s7.833-3.878 7.833-8.667c0-4.788-3.505-8.666-7.833-8.666zm3.917 8.666C27.417 14.95 25.654 13 23.5 13s-3.917 1.95-3.917 4.333c0 2.384 1.763 4.334 3.917 4.334s3.917-1.95 3.917-4.334zm7.833 19.5c-.392-1.538-6.462-4.333-11.75-4.333s-11.358 2.795-11.75 4.355V39h23.5v-2.167zm-27.417 0c0-5.763 10.438-8.666 15.667-8.666 5.229 0 15.667 2.903 15.667 8.666v6.5H7.833v-6.5z"
        fill={props.color}
        fillOpacity={0.5}
      />
    </Svg>
  );
};

export default ProfileIcon;
