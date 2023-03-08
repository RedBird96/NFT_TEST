import { IconButton } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Sun, Moon } from "react-feather";

type Props = {
  size?: "xs" | "sm" | "md" | "lg";
};

const ColorMode = (props: Props) => {
  const { size = "md" } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      size={size}
      aria-label="Toggle color mode"
      icon={colorMode === "dark" ? <Sun /> : <Moon />}
      onClick={toggleColorMode}
    />
  );
};

export default ColorMode;
