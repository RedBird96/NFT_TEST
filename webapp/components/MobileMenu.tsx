import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useColorModeValue } from "@chakra-ui/color-mode";
import Link from "next/link";
import { map } from "ramda";

import constants from "../lib/constants";

const MobileMenu = () => {
  const bg = useColorModeValue("rgba(255,255,255,0.5)", "rgba(0,0,0,0.5)");
  return (
    <Box
      position={"fixed"}
      left={"0"}
      top={"0"}
      right={"0"}
      bottom={"0"}
      paddingY={"16"}
      paddingX={"4"}
      backgroundColor={bg}
    >
      {map(
        (item) => (
          <Link href={item.value} passHref>
            <Button size={"sm"} mb={"4"} isFullWidth>
              {item.label}
            </Button>
          </Link>
        ),
        constants.MENU
      )}
    </Box>
  );
};

export default MobileMenu;
