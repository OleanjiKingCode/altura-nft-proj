import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

type Connector = MetaMaskConnector | WalletConnectConnector;
export const { chains, provider } = configureChains(
  [mainnet],
  [publicProvider()]
);

export const connectors: Connector[] = [
  new MetaMaskConnector({ chains, options: { shimDisconnect: true } }),
  new WalletConnectConnector({
    chains,
    options: {
      projectId: "",
      showQrModal: true,
    },
  }),
];
