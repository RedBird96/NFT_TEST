import type { AppProps } from "next/app";
import { ChakraProvider, Box, Container } from "@chakra-ui/react";

import Header from "../components/Header";
import { ConditionProvider } from "../hooks/useCondition";
import { AssetProvider } from "../hooks/useAssets";

function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ConditionProvider>
        <AssetProvider>
          <Header />
          <Box as={"main"} paddingTop={"32"}>
            <Container maxW={"100%"}>
              <Component {...pageProps} />
            </Container>
          </Box>
        </AssetProvider>
      </ConditionProvider>
    </ChakraProvider>
  );
}

export default App;
