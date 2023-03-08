import { AspectRatio, Text, Link as Chakralink } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/image";
import { Box, Flex } from "@chakra-ui/react";
import { Assets } from "../types";
import { makeShortAddress } from "../lib/utils";

type Props = {
  id: string;
  image_url: string;
  name: string;
  onClickAsset: (asset_id:string) => void;
};

const Asset = (props: Props) => {
  const { id, image_url, name, onClickAsset } = props;
  const onClickBox = () => {
    onClickAsset(id);
  }
  return (
    // <Chakralink href={permalink} isExternal>
    <Box cursor={"pointer"} onClick={onClickBox}>
      <AspectRatio mb={"2"}>
        <Image src={image_url} alt="" borderRadius={"lg"} />
      </AspectRatio>
      <Text fontSize={"small"} textTransform={"uppercase"} textAlign={"center"}>
        {name}
      </Text>
      <Text
        fontSize={"x-small"}
        textTransform={"uppercase"}
        textAlign={"center"}
      >
        {makeShortAddress(id)}
      </Text>
    </Box>
    // </Chakralink>
  );
};

export default Asset;
