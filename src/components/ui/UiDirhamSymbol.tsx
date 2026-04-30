import React from "react";
import Svg, { Path, Rect } from "react-native-svg";

type UiDirhamSymbolProps = {
  size?: number;
  color: string;
};

/** UAE Dirham symbol (CBUAE-style “D” with horizontal bars), matching `resource/index.html` `.dh`. */
export function UiDirhamSymbol({ size = 14, color }: UiDirhamSymbolProps) {
  return (
    <Svg width={size} height={size} viewBox="1 1.5 14 12">
      <Path fillRule="evenodd" fill={color} d="M3 2h5a5.5 5.5 0 0 1 0 11H3V2zm2 2v7h3a3.5 3.5 0 0 0 0-7H5z" />
      <Rect x="1.5" y="5.3" width="13" height="1.3" rx="0.3" fill={color} />
      <Rect x="1.5" y="8.7" width="13" height="1.3" rx="0.3" fill={color} />
    </Svg>
  );
}
