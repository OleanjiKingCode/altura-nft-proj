import Head from "next/head";
import { Box, chakra, Flex } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Altura (I hope im picked)</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <chakra.div w="full">
        <Flex direction="column" mx="auto" w="full" bg="">
          <Box>
            <chakra.div pt={{ base: 6, lg: 14 }}>
              {/* <HeroSection /> */}
            </chakra.div>
          </Box>
        </Flex>
      </chakra.div>
    </>
  );
}
