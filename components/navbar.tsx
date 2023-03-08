import {
  Button,
  Flex,
  Spacer,
  Text,
  useDisclosure,
  Image,
  ListItem,
  List,
  Box,
  HStack,
  chakra,
  Icon,
  VStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import NextLink from "next/link";
import { useNetwork, useAccount } from "wagmi";
import ProfileSubMenu from "./ProfileSubMenu";
import WalletConnect from "./WalletConnect";
import { NetworkNotification } from "./NetworkNotification";
import { utils } from "ethers";
import { RiMenu3Fill } from "react-icons/ri";

export const Navbar = () => {
  const [openWalletConnect, setOpenWalletConnect] = useState<boolean>(false);
  const { chain } = useNetwork();

  const NETWORK_DATA = [
    {
      name: "Ethereum",
      isActive: false,
      chainId: utils.hexValue(1),
      chainNoHex: 1,
      chainName: "Ethereum Mainnet",
      nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
      rpcUrls: ["https://api.mycryptoapi.com/eth"],
      blockExplorerUrls: ["https://etherscan.io"],
    },
  ];
  const [currentNetwork, setCurrentNetwork] = useState(NETWORK_DATA[0]);
  const [dropdown, setDropdown] = useState(false);
  const { isConnected: isUserConnected } = useAccount();
  const {
    isOpen: isOpenSwitch,
    onOpen: onOpenSwitch,
    onClose: onCloseSwitch,
  } = useDisclosure();

  useEffect(() => {
    CheckNetwork();
  }, [isUserConnected, currentNetwork]);

  const CheckNetwork = () => {
    if (isUserConnected && chain?.id !== currentNetwork.chainNoHex) {
      onOpenSwitch();
    }
  };

  return (
    <VStack>
      <Flex
        boxSize="full"
        align="center"
        gap="2.5"
        py="17px"
        px={{ base: "4", lg: "10" }}
        fontSize="sm"
        borderColor="gray.200"
        borderBottomWidth="1px"
      >
        <NextLink href="/" passHref>
          <Flex as="a" alignItems="center" gap="3" w="96" cursor="pointer">
            {/* <Image
              src="/logo.jpg"
              w={{ base: "18%", md: "18%" }}
              h={{ base: "18%", md: "18%" }}
              alt="logo"
            /> */}

            <Text fontWeight="bold" fontSize={{ base: "md", md: "2xl" }}>
              Altura NFT Project
            </Text>
          </Flex>
        </NextLink>
        <Spacer />
        <HStack display={{ base: "none", lg: "unset" }} spacing="5">
          <>
            {!isUserConnected ? (
              <Button
                size="sm"
                onClick={() => setOpenWalletConnect(true)}
                fontSize="sm"
                px="4"
                fontWeight="medium"
                bg="gray.800"
                color="white"
                _hover={{ bg: "#F0FFF4", color: "black" }}
              >
                Connect Wallet
              </Button>
            ) : (
              <ProfileSubMenu />
            )}
          </>
        </HStack>
        <chakra.div display={{ base: "unset", lg: "none" }}>
          <Button
            bg="transparent"
            _hover={{ bg: "gray.800", color: "white" }}
            _active={{ bg: "gray.800", color: "white" }}
            onClick={() => setDropdown(!dropdown)}
          >
            <Icon as={RiMenu3Fill} />
          </Button>
        </chakra.div>
      </Flex>
      <Flex
        w="full"
        display={dropdown ? { base: "unset", lg: "none" } : "none"}
        bg="blackAlpha.500"
        opacity="0.9"
        py="5"
        fontSize="md"
        textAlign="center"
      >
        {!isUserConnected ? (
          <Button
            size="sm"
            onClick={() => setOpenWalletConnect(true)}
            fontSize="sm"
            px="4"
            fontWeight="medium"
            color="white"
            _hover={{ bg: "gray.100", color: "black" }}
          >
            Connect Wallet
          </Button>
        ) : (
          <VStack gap={3}>
            <Text fontWeight="600">Your Wallet Details</Text>
            <ProfileSubMenu />
          </VStack>
        )}
      </Flex>

      <WalletConnect
        onClose={() => setOpenWalletConnect(false)}
        isOpen={openWalletConnect}
      />
      <NetworkNotification isOpen={isOpenSwitch} onClose={onCloseSwitch} />
    </VStack>
  );
};
