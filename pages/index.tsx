import Head from "next/head";
import { Box, chakra, Flex } from "@chakra-ui/react";
import GetNfts from "@/components/GetNfts";

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
          <GetNfts />
        </Flex>
      </chakra.div>
    </>
  );
}
