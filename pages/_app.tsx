import React from "react";
import { chakra, ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { createClient, WagmiConfig } from "wagmi";
import { connectors, provider } from "../config/wagmi";
import { Navbar } from "../components/Nav/navbar";

type CreateClientArgs = NonNullable<Parameters<typeof createClient>[number]>;
type CreateClientConnectors = CreateClientArgs["connectors"];
const createClientConnectors = connectors as CreateClientConnectors;

const client = createClient({
  autoConnect: true,
  connectors: createClientConnectors,
  provider,
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS>
      <WagmiConfig client={client}>
        <chakra.div w="full">
          <chakra.div
            h="5.5em"
            top="0"
            transition="box-shadow 0.2s"
            backdropFilter="blur(2px)"
            zIndex="sticky"
            color="black"
          >
            <Navbar />
            <Component {...pageProps} />
          </chakra.div>
        </chakra.div>
      </WagmiConfig>
    </ChakraProvider>
  );
};

export default MyApp;
