"use client";

import Header from "@/components/Header";
import DisplayContacts from "@/components/DisplayContacts";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export default function Home() {

  const { publicClient, webSocketPublicClient } = configureChains(
    [mainnet],
    [publicProvider()]
  );

  const config = createConfig({
    autoConnect: true,
    publicClient,
    webSocketPublicClient,
  });
  
  return (
    <>
      <WagmiConfig config={config}>
        <Header></Header>
        <DisplayContacts></DisplayContacts>
      </WagmiConfig>
    </>
  );
}
