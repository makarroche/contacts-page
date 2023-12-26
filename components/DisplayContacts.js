import {useEffect, useState } from "react";
import {Col, Container, Row} from "react-bootstrap";
import ButtonContact from "@/components/ButtonContact";
import ContactModal from "@/components/ContactModal";
import ToastOptions from "@/components/ToastOptions";
import TooltipCopy from "@/components/TooltipCopy";
import SearchBar from "@/components/SearchBar";

const DisplayContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [newContact, setNewContact] = useState("");
  const [editContact, setEditContact] = useState("");
  const [removedContact, setRemovedContact] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [copyAddressClick, setCopyAddressClick] = useState(false);
  const [editContactClick, setEditContactClick] = useState(false);
  const [removeContactClick, setRemoveContactClick] = useState(false);
  const [contactKey, setContactKey] = useState("");
  const [searchContacts, setSearchContacts] = useState("");
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (newContact) handleAddContact();
  }, [newContact]);

  useEffect(() => {
    if (copyAddressClick) handleCopyAddress();
  }, [copyAddressClick]);

  useEffect(() => {
    if (editContact) handleEditContact();
  }, [editContact]);

  useEffect(() => {
    if (removedContact) handleRemoveContact();
  }, [removedContact]);

  useEffect(() => {
    const oldContact = findContact(contactKey);
    setContactInfo(oldContact);
  }, [editContactClick]);

  useEffect(() => {
    basicSearchContacts();
  }, [searchWord]);

  const handleAddContact = () => {
    setContacts([...contacts, newContact]);
    setShowContactModal(false);
  };

  const sliceAddress = (address) => {
    return address
      .substring(0, 5)
      .concat("...")
      .concat(address.substring(37, address.length));
  };

  const handleCopyAddress = () => {
    const address = contacts.find(
      (contact) => contact.address === contactKey
    ).address;
    if (address) navigator.clipboard.writeText(address);
    setShowToast(false);
    setShowTooltip(true);
    setCopyAddressClick(false);
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
    setEditContactClick(false);
  };

  const handleRemoveContact = () => {
    const aux = contacts.slice();
    const removed = aux.filter((contact) => contact.address != contactKey);
    setContacts(removed);
    setShowToast(false);
    setRemoveContactClick(false);
    setRemovedContact(false);
  };

  const findContact = () => {
    const contact = contacts.find((contact) => contact.address === contactKey);
    return contact;
  };

  const basicSearchContacts = () => {
    const aux = contacts.slice();
    const filtered = aux.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchWord.toLowerCase()) || contact.address === searchWord
    );
    setSearchContacts(filtered);
  };

  return (
    <>
      <SearchBar searchWord={setSearchWord}></SearchBar>
      <Container className="h-75 d-inline-block">
        <Row>
          <p className="fw-bold mt-2 mb-4 ">All contacts ({contacts.length})</p>
        </Row>
        {(searchContacts?.length >= 0 && searchWord
          ? searchContacts
          : contacts
        ).map((contact) => {
          return (
            <React.Fragment key={contact.address}>
              <Row className="text-left fw-bold ms-auto">
                <Col className="ps-0" xs={6}>
                  {contact.name}
                </Col>
                <Col className="d-flex justify-content-end pe-3 pb-2" xs={6}>
                  <img
                    id={contact.address}
                    src="/threeDot.svg"
                    alt="Bootstrap"
                    width="15"
                    height="15"
                    onClick={() => setShowToast(contact.address)}
                  ></img>
                  {showToast === contact.address && (
                    <ToastOptions
                      copyAddressClick={setCopyAddressClick}
                      editContactClick={setEditContactClick}
                      removeContactClick={setRemoveContactClick}
                      contactKey={setContactKey}
                      keyClicked={contact.address}
                    ></ToastOptions>
                  )}
                  {showTooltip && contactKey === contact.address && (
                    <TooltipCopy showTooltip={setShowTooltip}></TooltipCopy>
                  )}
                </Col>
              </Row>
              <Row>
                <p className="fw-light">{sliceAddress(contact.address)}</p>
              </Row>
            </React.Fragment>
          );
        })}
        {searchContacts?.length === 0 && searchWord && (
          <Row className="text-center">
            <p>No results</p>
          </Row>
        )}

        <Row className="justify-content-center mx-3 fixed-bottom mb-4">
          <ButtonContact
            type="outline-primary"
            text="Add new contact"
            onClick={setShowContactModal}
            disabled={false}
          ></ButtonContact>
        </Row>
        {showContactModal && (
          <ContactModal
            title="New contact"
            type="new"
            newContact={setNewContact}
            showContactModal={setShowContactModal}
          ></ContactModal>
        )}
        {editContactClick && (
          <ContactModal
            title="Edit contact"
            type="edit"
            newContact={setEditContact}
            showContactModal={setShowContactModal}
            oldContact={contactInfo}
          ></ContactModal>
        )}
        {removeContactClick && (
          <ContactModal
            type="remove"
            showContactModal={setShowContactModal}
            removedContact={setRemovedContact}
          ></ContactModal>
        )}
      </Container>
    </>
  );
};

export default DisplayContacts;
