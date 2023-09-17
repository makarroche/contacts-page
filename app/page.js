"use client";

import styles from './page.module.css'
import { Col, Row, Container, InputGroup } from "../lib/ui.js";
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import SingleContact from '@/components/SingleContact';
import ToastOptions from '@/components/ToastOptions';
import TheButton from '@/components/TheButton';
import TooltipCopy from '@/components/TooltipCopy';

export default function Home() {
  return (
   <Container>
    <Header></Header>
    <SearchBar></SearchBar>
    <p>All contacts (0)</p>
    <>
    <SingleContact></SingleContact>
    <TheButton type = "outline-primary" text="Add new contact" color="blue"></TheButton>
    <TheButton type = "outline-danger" text="Yes, remove contact" color="red"></TheButton>
    <TheButton type = "primary" text="Save edits"></TheButton>
    <ToastOptions></ToastOptions>
    <TooltipCopy></TooltipCopy>
    </>
   </Container>
  )
}
