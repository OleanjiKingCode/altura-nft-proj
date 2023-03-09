import { shortenText } from "@/utils/shortenText";
import { slugifyText } from "@/utils/slugifyText";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  Text,
  ModalCloseButton,
  ModalBody,
  chakra,
  Box,
  Flex,
  VStack,
  Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

export const NftModal = ({
  isOpen,
  onClose,
  modalData,
}: {
  isOpen: boolean;
  onClose: () => void;
  modalData: any;
}) => {
  return (
    <Modal
      isOpen={isOpen}
      size={{ sm: "lg", md: "2xl", lg: "3xl" }}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg="#3a4459" w="full" color="white">
        <ModalBody rounded="2xl">
          <Stack
            direction={{ sm: "column", md: "row" }}
            w="full"
            spacing="5"
            py="5"
            alignItems="start"
          >
            <Box w="full">
              <chakra.div
                rounded="2xl"
                overflow="hidden"
                maxW={{ sm: "50%", md: "100%" }}
              >
                <img src={modalData?.media[0].gateway} />
              </chakra.div>
            </Box>

            <Flex minW="200px" h="max" gap="3" direction="column" pt="1">
              <ModalCloseButton color="red.500" />
              <Box>
                <chakra.span fontWeight="700">ID: </chakra.span>
                <chakra.span>{modalData?.title}</chakra.span>
              </Box>
              <Box>
                <chakra.span fontWeight="700">Name: </chakra.span>
                <chakra.span>{modalData?.contractMetadata.name}</chakra.span>
              </Box>
              <Box>
                <chakra.span fontWeight="700">Description: </chakra.span>
                <chakra.span>{shortenText(modalData?.description)}</chakra.span>
              </Box>
              <Box>
                <chakra.span fontWeight="700">Number Owned: </chakra.span>
                <chakra.span>{modalData?.balance}</chakra.span>
              </Box>
              <Box>
                <chakra.span fontWeight="700">Total Supply: </chakra.span>
                <chakra.span>
                  {modalData?.contractMetadata.totalSupply}
                </chakra.span>
              </Box>
              <Box>
                <chakra.span fontWeight="700">Price: </chakra.span>
                <chakra.span>
                  # {modalData?.contractMetadata.openSea.floorPrice}
                </chakra.span>
              </Box>
              <VStack w="full">
                <chakra.div
                  w="full"
                  rounded="md"
                  bg="white"
                  textAlign="center"
                  py="2"
                  color="#4ed879"
                  _hover={{ bg: "#4ed879", color: "white" }}
                >
                  <Link
                    href={`https://opensea.io/collection/${slugifyText(
                      modalData?.contractMetadata.openSea.collectionName
                    )}`}
                    color="brandLinkColor"
                    target="_blank"
                  >
                    <Text w="full" fontWeight="500">
                      Buy/View on OpenSea
                    </Text>
                  </Link>
                </chakra.div>
                <chakra.div
                  w="full"
                  rounded="md"
                  bg="white"
                  textAlign="center"
                  py="2"
                  color="#4ed879"
                  _hover={{ bg: "#4ed879", color: "white" }}
                >
                  <Link
                    href={`https://etherscan.io/token/${modalData?.contract.address}`}
                    color="brandLinkColor"
                    target="_blank"
                  >
                    <Text w="full" fontWeight="500">
                      View on Etherscan
                    </Text>
                  </Link>
                </chakra.div>
              </VStack>
            </Flex>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
