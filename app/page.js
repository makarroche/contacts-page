"use client";

import styles from './page.module.css'
import { Col, Row, Container, InputGroup } from "../lib/ui.js";
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import ToastOptions from '@/components/ToastOptions';
import TooltipCopy from '@/components/TooltipCopy';
import DisplayContacts from '@/components/DisplayContacts';

export default function Home() {
  return (
    <>
    <Header></Header>
    <SearchBar></SearchBar>
    <DisplayContacts></DisplayContacts>
    </>
  )
}
