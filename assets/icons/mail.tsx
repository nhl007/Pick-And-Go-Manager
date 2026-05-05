import Svg, { Path, SvgProps } from "react-native-svg";
const MailIcon = (props: SvgProps) => (
  <Svg
    width={24}
    height={24}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="login-input-ic"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path d="M17 2a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5h10zM7 9h10M7 13h7" />
  </Svg>
);
export default MailIcon;
