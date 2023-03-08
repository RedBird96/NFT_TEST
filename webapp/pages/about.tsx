import { Box, Heading, Text } from "@chakra-ui/layout";
import type { NextPage } from "next";

const About: NextPage = () => {
  
  return (
    <Box>
      <Heading fontSize={"2xl"} textTransform={"uppercase"} mb={"2"}>
        The manifesto
      </Heading>
      <Text>Here comes a new wave...</Text>
      <Text>And surfing here is different.</Text>
    </Box>
  );
};

export default About;
