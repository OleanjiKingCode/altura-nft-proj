import { shortenText } from "@/utils/shortenText";
import {
  Flex,
  Box,
  Text,
  Button,
  chakra,
  Heading,
  useDisclosure,
  Tag,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { NftModal } from "./NftModal";

export const network_array = [
  { id: "eth-mainnet", name: "ETHMAIN" },
  { id: "eth-goerli", name: "ETHTEST" },
  { id: "polygon-mainnet", name: "POLYMAIN" },
  { id: "polygon-mumbai", name: "POLYTEST" },
  { id: "arb-mainnet", name: "ARBMAIN" },
  { id: "arb-goerli", name: "ARBTEST" },
  { id: "opt-mainnet", name: "OPTMAIN" },
  { id: "opt-goerli", name: "OPTTEST" },
];

const GetNfts = () => {
  const { isConnected: isUserConnected, address } = useAccount();
  const [allNfts, setAllNfts] = useState<any>({});
  const [modalData, setModalData] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const apiKey = "00xThk6gtxkPRD3sRgi7Z5mJlzyX_5zb";

  const getNftData = async () => {
    let nfts;
    var requestOptions = {
      method: "GET",
    };

    let allArray: any = {};
    network_array.map(async (network) => {
      const baseURL = `https://${network.id}.g.alchemy.com/nft/v2/${apiKey}/getNFTs/`;
      const fetchURL = `${baseURL}?owner=${address}`;
      nfts = await fetch(fetchURL, requestOptions).then((data) => data.json());
      if (nfts) {
        allArray = { ...allArray, [network.name]: nfts };
      }
      console.log(allArray["POLYMAIN"]?.ownedNfts, allArray);
      console.log(allArray);
      setAllNfts(allArray);
    });
  };

  const filterNftData = async () => {
    await getNftData();
    let arr: any = allNfts;
    console.log(arr, "ckkmskmsdvkm");
    let newArray: any = {};
    network_array.map((network) => {
      console.log(arr[network.name]);
      if (arr[network.name]?.ownedNfts.length > 0) {
        console.log("fvmkmk");
        arr[network.name]?.ownedNfts.map((item: any) => {
          if (item.title !== "") {
            newArray = { ...newArray, newArray };
          }
        });
      }
      setAllNfts(newArray);
    });
  };

  useEffect(() => {
    filterNftData();
  }, [isUserConnected, address]);
  console.log(allNfts);
  return (
    <Box minH="90vh" bg="#1a202c">
      <>
        {!isUserConnected && !address ? (
          <Flex
            w="full"
            p="10"
            textAlign="center"
            alignItems="center"
            justifyContent="center"
            minH="inherit"
            color="white"
          >
            <Text fontWeight="700" fontSize="2xl">
              Connect your wallet to view all yout NFTS (ERC 721 Tokens)
            </Text>
          </Flex>
        ) : (
          <SimpleGrid
            columns={{ sm: 1, md: 2, lg: 3 }}
            py="10"
            px="4"
            spacing="20px"
          >
            {allNfts["POLYMAIN"]?.ownedNfts.map((item: any, i: number) => {
              return (
                <Box
                  key={i}
                  pb="4"
                  bg="#4ed879"
                  rounded="2xl"
                  mb="10"
                  cursor="pointer"
                >
                  <chakra.div
                    roundedTop="2xl"
                    overflow="hidden"
                    maxH="240px"
                    mb="5"
                  >
                    <img src={item.media[0].gateway} />
                  </chakra.div>

                  <Flex direction="column" gap="3" minH="40px" px="5">
                    <Flex alignItems="start" justifyContent="space-between">
                      <Heading
                        fontSize={
                          item.contractMetadata.name?.length > 17
                            ? { sm: "18", md: "28" }
                            : { sm: "15", md: "18" }
                        }
                        color="white"
                        minH="30px"
                      >
                        {item.contractMetadata.name}
                      </Heading>
                      <Tag size="sm" fontSize="lg" color="gray" bg="#4ed8c4">
                        {item.title}
                      </Tag>
                    </Flex>

                    <Text fontWeight="medium" color="white">
                      {shortenText(item.description)}
                    </Text>
                  </Flex>
                  <Box position="relative" bottom="-3" w="full" pb="1" px="5">
                    <Flex
                      gap="3"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Button
                        w="full"
                        fontWeight="500"
                        color="#4ed879"
                        onClick={() => {
                          setModalData(item);
                          onOpen();
                        }}
                      >
                        More
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </>
      <NftModal isOpen={isOpen} onClose={onClose} modalData={modalData} />
    </Box>
  );
};

export default GetNfts;
