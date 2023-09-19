"use client";

import styles from './page.module.css'
import { Col, Row, Container, InputGroup } from "../lib/ui.js";
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import DisplayContacts from '@/components/DisplayContacts';

export default function Home() {
  return (
    <>
    <Header></Header>
    <DisplayContacts></DisplayContacts>
    </>
  )
}
