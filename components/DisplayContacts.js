import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ButtonContact from "@/components/ButtonContact";
import ContactModal from "@/components/ContactModal";
import ToastOptions from "@/components/ToastOptions";
import TooltipCopy from "@/components/TooltipCopy";
import SearchBar from "@/components/SearchBar";
import InfiniteScroll from "react-infinite-scroll-component";

const DisplayContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [newContact, setNewContact] = useState("");
  const [contactOldInfo, setContactOldInfo] = useState("");
  const [editContact, setEditContact] = useState("");
  const [removedContact, setRemovedContact] = useState("");
  const [threeDotAction, setThreeDotAction] = useState("");
  const [contactKey, setContactKey] = useState("");
  const [searchContacts, setSearchContacts] = useState("");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (newContact) handleAddContact();
  }, [newContact]);

  useEffect(() => {
    if (editContact) handleEditContact();
  }, [editContact]);

  useEffect(() => {
    if (removedContact) {
      handleRemoveContact();
    }
  }, [removedContact]);

  useEffect(() => {
    if (threeDotAction === "Edit") {
      const oldContact = findContact(contactKey);
      setContactOldInfo(oldContact);
    }
    if (threeDotAction === "Copy") {
      handleCopyAddress();
    }
  }, [threeDotAction]);

  useEffect(() => {
    basicSearchContacts();
  }, [searchWord]);

  const handleClickThreeDots = (contactAddress) => {
    setShowToast(!showToast);
    setContactKey(contactAddress);
  };

  const handleAddContact = () => {
    setContacts([...contacts, newContact]);
    setShowContactModal(false);
  };

  const sliceAddress = (address) => {
    return address.length > 20
      ? address
          .substring(0, 5)
          .concat("...")
          .concat(address.substring(37, address.length))
      : address;
  };

  const handleCopyAddress = () => {
    const address = contacts.find(
      (contact) => contact.address === contactKey
    ).address;
    if (address) navigator.clipboard.writeText(address);
    setShowTooltip(true);
    setThreeDotAction("");
  };

  const handleEditContact = () => {
    const contact = findContact();
    const aux = contacts.map((ct) =>
      ct.address === contact.address
        ? {
            ...ct,
            name: editContact.name,
            address: editContact.address,
            email: editContact.email,
          }
        : ct
    );
    setContacts(aux);
    setShowToast(false);
    setThreeDotAction("");
  };

  const handleRemoveContact = () => {
    const aux = contacts.slice();
    const removed = aux.filter((contact) => contact.address != contactKey);
    setContacts(removed);
    setShowToast(false);
    setRemovedContact(false);
    setThreeDotAction("");
  };

  const findContact = () => {
    const contact = contacts.find((contact) => contact.address === contactKey);
    return contact;
  };

  const basicSearchContacts = () => {
    const aux = contacts.slice();
    const filtered = aux.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchWord.toLowerCase()) ||
        contact.address === searchWord
    );
    setSearchContacts(filtered);
  };

  return (
    <>
      <SearchBar searchWord={setSearchWord}></SearchBar>
      <Container className="h-75 d-inline-block container-desktop-view">
        <Row>
          <p className="fw-bold mt-2 mb-4 text-white">
            All contacts ({contacts.length})
          </p>
        </Row>
        <div
          id="scrollableDiv"
          className="threeDotPosition"
          style={{ height: 400, overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={contacts.length}
            hasMore={true}
            scrollableTarget="scrollableDiv"
          >
            {(searchContacts?.length >= 0 && searchWord
              ? searchContacts
              : contacts
            ).map((contact) => {
              return (
                <React.Fragment key={contact.address}>
                  <div
                    id="contact-background"
                    className="rounded pt-2 ps-2 m-2"
                  >
                    <Row className="text-left fw-bold ms-auto">
                      <Col className="ps-0 text-white" xs={6}>
                        {contact.name}
                      </Col>
                      <Col
                        className="d-flex justify-content-end pe-3 pb-2"
                        xs={6}
                      >
                        <img
                          id={contact.address}
                          src="/threeDot.svg"
                          alt="Bootstrap"
                          width="15"
                          height="15"
                          onClick={() => handleClickThreeDots(contact.address)}
                        ></img>
                        {showToast && contactKey === contact.address && (
                          <ToastOptions
                            setThreeDotAction={setThreeDotAction}
                            setShowToast={setShowToast}
                            setShowContactModal={setShowContactModal}
                          ></ToastOptions>
                        )}
                        {showTooltip && contactKey === contact.address && (
                          <TooltipCopy
                            showTooltip={setShowTooltip}
                          ></TooltipCopy>
                        )}
                      </Col>
                    </Row>
                    <Row>
                      <p className="fw-light text-white">
                        {sliceAddress(contact.address)}
                      </p>
                    </Row>
                  </div>
                </React.Fragment>
              );
            })}
          </InfiniteScroll>
        </div>
        {searchContacts?.length === 0 && searchWord && (
          <Row className="text-center text-white">
            <p>No results</p>
          </Row>
        )}
        {showContactModal && (
          <ContactModal
            type="New"
            showContactModal={setShowContactModal}
            newContact={setNewContact}
            contacts={contacts}
          ></ContactModal>
        )}
        {threeDotAction === "Edit" && (
          <ContactModal
            type="Edit"
            showContactModal={setShowContactModal}
            newContact={setEditContact}
            setThreeDotAction={setThreeDotAction}
            oldContact={contactOldInfo}
          ></ContactModal>
        )}
        {threeDotAction === "Remove" && (
          <ContactModal
            type="Remove"
            showContactModal={setShowContactModal}
            setThreeDotAction={setThreeDotAction}
            removedContact={setRemovedContact}
          ></ContactModal>
        )}
        <Row
          id="add-new-contact-row"
          className="justify-content-center mx-3 fixed-bottom mb-4"
        >
          <ButtonContact
            type="outline-secondary"
            text="Add new contact"
            onClick={setShowContactModal}
            disabled={false}
            setShowToast={setShowToast}
          ></ButtonContact>
        </Row>
      </Container>
    </>
  );
};

export default DisplayContacts;
