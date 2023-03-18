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
  Image,
  SimpleGrid,
  Select,
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
  const [allFormattedNfts, setAllFormattedNfts] = useState<any>({});
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
      setAllNfts(allArray);
    });
    console.log(allArray);
  };

  const filterNftData = async (allArray: any) => {
    let arr: any = allArray;
    let newArray: any = {};
    let dd: any = [];
    network_array.map((network) => {
      if (arr[network.name]?.ownedNfts.length > 0) {
        arr[network.name]?.ownedNfts.map((item: any, i: number) => {
          if (item.title !== "" || item.description !== "") {
            dd.push(item);
          }
        });
      }
      arr[network.name].ownedNfts = dd;
      newArray = { ...newArray, [network.name]: arr[network.name] };
      dd = [];
    });
    setAllFormattedNfts(arr);
  };

  useEffect(() => {
    getNftData();
    filterNftData(allNfts);
  }, [isUserConnected, address]);

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
          <Flex direction="column">
            <Select placeholder="Select option">
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </Select>
            <SimpleGrid
              columns={{ sm: 1, md: 2, lg: 3 }}
              py="10"
              px="4"
              spacing="20px"
            >
              {allFormattedNfts["POLYMAIN"]?.ownedNfts.map(
                (item: any, i: number) => {
                  return (
                    <Flex
                      key={i}
                      pb="4"
                      bg="#4ed879"
                      rounded="2xl"
                      mb="10"
                      cursor="pointer"
                      minH="446px"
                      direction="column"
                      alignItems="center"
                    >
                      <chakra.div
                        roundedTop="2xl"
                        overflow="hidden"
                        maxH="240px"
                        mb="5"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Image src={item.media[0].gateway} minH="240px" />
                      </chakra.div>

                      <Flex direction="column" gap="3" minH="40px" px="5">
                        {item.contractMetadata.name ? (
                          <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            h="50"
                          >
                            <Heading
                              fontSize={
                                item.contractMetadata.name?.length > 17
                                  ? { sm: "15", md: "18" }
                                  : { sm: "18", md: "28" }
                              }
                              color="white"
                              minH="30px"
                            >
                              {item.contractMetadata.name}
                            </Heading>
                            <Tag
                              size="sm"
                              fontSize="lg"
                              color="gray"
                              bg="#4ed8c4"
                            >
                              {shortenText(item.title, 12)}
                            </Tag>
                          </Flex>
                        ) : (
                          <Flex
                            alignItems="center"
                            justifyContent="space-between"
                            h="50"
                          >
                            <Heading
                              fontSize={
                                item.title?.length > 17
                                  ? { sm: "15", md: "18" }
                                  : { sm: "18", md: "28" }
                              }
                              color="white"
                              minH="30px"
                            >
                              {item.title}
                            </Heading>
                          </Flex>
                        )}

                        <Text fontWeight="medium" color="white">
                          {shortenText(item.description, 90)}
                        </Text>
                      </Flex>
                      <Box
                        position="relative"
                        bottom="-3"
                        w="full"
                        pb="1"
                        px="5"
                      >
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
                    </Flex>
                  );
                }
              )}
            </SimpleGrid>
          </Flex>
        )}
      </>
      <NftModal isOpen={isOpen} onClose={onClose} modalData={modalData} />
    </Box>
  );
};

export default GetNfts;
