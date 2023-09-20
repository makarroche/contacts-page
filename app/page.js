"use client";

import styles from "./page.module.css";
import { Col, Row, Container, InputGroup } from "../lib/ui.js";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import DisplayContacts from "@/components/DisplayContacts";
import { WagmiConfig, configureChains, createConfig, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

export default function Home() {

  const { chains, publicClient, webSocketPublicClient } = configureChains(
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
