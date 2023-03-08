import {
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  placement?: "bottom" | "end" | "left" | "right" | "start" | "top";
  onClose: () => void;
  header: string;
  children: React.ReactNode;
};

const Drawer = (props: Props) => {
  const { isOpen, placement = "right", onClose, header, children } = props;
  return (
    <ChakraDrawer placement={placement} isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{header}</DrawerHeader>
        {children}
      </DrawerContent>
    </ChakraDrawer>
  );
};

export default Drawer;
