import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';

const FertalizerIcon = (props) => {
  return (
    <Svg width={40} height={40} viewBox="0 0 50 45" fill="none" {...props}>
      <G opacity={0.8} clipPath="url(#prefix__clip0)" fill="#000">
        <Path d="M12.662 42.975A68.714 68.714 0 0025 44.25c4.15-.053 8.283-.48 12.338-1.275 1.759 1.257 3.922 1.967 6.167 2.025.988-.011 1.845-.618 2.09-1.48.677-1.779-.14-4.943-2.176-6.658A83.67 83.67 0 0045 22.5a83.658 83.658 0 00-1.578-14.363c2.036-1.714 2.853-4.875 2.175-6.657C45.353.62 44.497.012 43.508 0c-2.244.058-4.408.768-6.166 2.025A68.711 68.711 0 0025 .75a68.71 68.71 0 00-12.338 1.275C10.902.768 8.737.057 6.492 0c-.989.011-1.845.619-2.09 1.48-.677 1.779.14 4.943 2.176 6.657A83.668 83.668 0 005 22.5c.11 4.817.637 9.62 1.578 14.362-2.036 1.715-2.853 4.88-2.175 6.657.244.863 1.1 1.47 2.089 1.481 2.245-.057 4.41-.768 6.17-2.025zm-6.683.056c-.299-1.472.05-2.99.975-4.234l.151.729c.05.267.258.488.541.58.284.09.6.037.827-.141a.708.708 0 00.27-.718A90.035 90.035 0 016.667 22.5c.164-5.626.859-11.23 2.076-16.75.068-.4-.229-.777-.671-.851-.442-.074-.87.18-.967.576l-.15.729C6.03 4.96 5.68 3.441 5.978 1.97c.178-.47.404-.47.513-.47a9.862 9.862 0 013.961.975l-.25.055c-.435.108-.695.508-.587.902.108.395.546.64.986.554A70.419 70.419 0 0125 2.25a70.42 70.42 0 0114.398 1.732c.441.087.878-.158.987-.553.108-.394-.152-.794-.587-.902l-.25-.055a9.864 9.864 0 013.96-.972c.109 0 .334 0 .513.466.299 1.472-.05 2.991-.975 4.235l-.151-.729a.776.776 0 00-.541-.58.906.906 0 00-.827.14.708.708 0 00-.27.718 90.04 90.04 0 012.076 16.75 90.04 90.04 0 01-2.075 16.75c-.061.265.042.54.269.717a.906.906 0 00.827.14.776.776 0 00.541-.579l.15-.729c.925 1.244 1.275 2.763.976 4.234-.178.467-.404.467-.513.467a9.863 9.863 0 01-3.961-.975l.25-.055c.435-.108.695-.508.587-.902-.108-.395-.546-.64-.986-.553A70.42 70.42 0 0125 42.75a70.421 70.421 0 01-14.398-1.733.897.897 0 00-.818.199.698.698 0 00-.203.74c.087.26.325.46.622.517l.25.055a9.863 9.863 0 01-3.961.972c-.109 0-.335 0-.513-.467v-.002z" />
        <Path d="M12.5 22.5c0 6.213 5.596 11.25 12.5 11.25s12.5-5.037 12.5-11.25S31.904 11.25 25 11.25c-6.9.007-12.492 5.04-12.5 11.25zM25 32.25c-2.918 0-5.711-1.062-7.744-2.945.472-.511 1.172-.806 1.91-.805a2.608 2.608 0 011.543.5c.2.145.461.2.71.148a.822.822 0 00.569-.411c.503-.961 1.532-1.614 2.708-1.717a6.968 6.968 0 01-.456 1.172.688.688 0 00.078.753c.174.22.467.338.765.31a.83.83 0 00.677-.447 8.473 8.473 0 00.59-1.543c.731.297 1.32.82 1.662 1.472.11.208.319.36.569.412a.904.904 0 00.71-.149c.434-.322.98-.499 1.542-.5.739-.001 1.44.294 1.911.805-2.033 1.883-4.826 2.945-7.744 2.945zm.602-12.194c-.055-.787.237-1.562.811-2.158.809-.632 2.327-.473 2.95-.375a.1.1 0 01.054.06c.022.565-.013 1.95-.805 2.572-.793.622-2.31.47-2.879.384l-.13-.483zm-1.487.841c-.54.356-1.766 1.054-2.75.837-.948-.367-1.683-1.074-2.028-1.95a.106.106 0 01.019-.087 4.92 4.92 0 012.404-.913c.137 0 .273.014.406.043.807.299 1.457.864 1.814 1.581l.135.49zM35.833 22.5c0 2.023-.703 3.995-2.012 5.64-.782-.73-1.861-1.142-2.988-1.14-.62.002-1.23.13-1.787.375a5.038 5.038 0 00-2.417-1.62 10.073 10.073 0 00-.35-3.653c.166.01.333.024.513.024a4.728 4.728 0 002.916-.839c1.285-1.014 1.417-2.787 1.375-3.759-.04-.733-.636-1.345-1.438-1.478-1.057-.168-3.025-.3-4.328.722-.49.406-.852.92-1.05 1.492a3.843 3.843 0 00-1.696-.89c-1.567-.357-3.156.414-4.213 1.126-.65.454-.87 1.252-.527 1.926.566 1.071 1.57 2.421 3.137 2.77.263.057.533.086.804.086a5.86 5.86 0 002.86-.884 8.95 8.95 0 01.334 3.108c-1.593.016-3.082.712-4.014 1.875A4.466 4.466 0 0019.168 27c-1.127-.002-2.206.41-2.988 1.14-2.709-3.432-2.663-8.042.114-11.43 2.776-3.387 7.656-4.787 12.098-3.47 4.443 1.316 7.445 5.05 7.442 9.26zM10.917 9.707A47.266 47.266 0 0125 7.5c4.799.023 9.559.769 14.083 2.207.281.09.593.037.82-.137a.71.71 0 00.277-.707.778.778 0 00-.542-.57 48.074 48.074 0 00-29.271 0c-.434.138-.662.566-.509.957.154.39.63.595 1.064.457h-.005zM10.364 36.707A48.291 48.291 0 0025 39a48.291 48.291 0 0014.636-2.293c.434-.138.661-.566.508-.957-.153-.39-.63-.595-1.063-.457A47.266 47.266 0 0125 37.5a47.27 47.27 0 01-14.084-2.207c-.434-.138-.91.067-1.064.457-.153.39.075.82.509.957h.002z" />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h50v45H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default FertalizerIcon;
