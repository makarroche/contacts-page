"use client";

import Header from "@/components/Header";
import DisplayContacts from "@/components/DisplayContacts";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { Container } from "react-bootstrap";

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
        <Container id="container-desktop-view">
        <Header></Header>
        <DisplayContacts></DisplayContacts>
        </Container>
      </WagmiConfig>
    </>
  );
}
