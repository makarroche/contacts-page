"use client";

import Image from 'next/image'
import styles from './page.module.css'
import { Col, Row, Container } from "../lib/ui.js";
import Header from '@/components/Header';

export default function Home() {
  return (
   <Container>
    <Header></Header>
   </Container>
  )
}
