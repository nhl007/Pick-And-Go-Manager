import Svg, { Path, Rect, SvgProps } from "react-native-svg";
const LockIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    viewBox="0 0 24 24"
    {...props}
  >
    <Rect width={18} height={11} x={3} y={11} rx={2} ry={2} />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);
export default LockIcon;
