import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import "./table.module.css";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  ModalCloseButton,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
function Table() {

  const [list, setList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  //get data fun
  const getData = () => {
    axios
      .get("http://localhost:8080/visity/list")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.log("someting went wrong");
      });
  };

  //handle delete
  const hanleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/visity/deletePost/${id}`)
      .then((res) => {
        toast({
          title: `${res.data}`,

          status: "success",
          duration: 3000,
          isClosable: true,
        });
        getData();
      })
      .catch((err) => {
        toast({
          title: "someting went wrong",

          status: "error",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  //handle open
  const hanleOpen = (data) => {
    onOpen();
    setName(data.name);
    setEmail(data.email);
    setMobile(data.mobileNumber);
  };
  //handle edit
  const handleEdit = (id) => {
    event.preventDefault();
    const nameSplit = name.split(" ");
    let countName = 0;
    for (let i = 0; i < nameSplit.length; i++) {
      let trm = nameSplit[i].trim();
      countName += trm.length;
    }
    if (countName < 5) {
      toast({
        title: "enter minimum 5 charactor",

        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else if (mobile.length < 10 || mobile.length > 10) {
      toast({
        title: "enter 10 digit Number",

        status: "warning",
        duration: 2000,
        isClosable: true,
      });
    } else {
      const data = {
        name: name,
        email: email,
        mobileNumber: mobile,
      };
      axios
        .patch(`http://localhost:8080/visity/editPost/${id}`, data)
        .then((res) => {
          toast({
            title: `${res.data}`,

            status: "success",
            duration: 2000,
            isClosable: true,
          });
        });
      onClose();
      getData();
    }
  };
  console.log(list);
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {list.length > 0 ? (
        <div>
          <h1>List</h1>
          <table>
            <tbody>
              <tr>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>

              {list.length > 0 &&
                list.map((ele) => {
                  return (
                    <tr key={ele._id}>
                      <td>{ele.name}</td>
                      <td>{ele.mobileNumber}</td>
                      <td>{ele.email}</td>
                      <td>
                        <Button
                          onClick={() => hanleOpen(ele)}
                          height={5}
                          colorScheme="teal"
                          variant="outline"
                        >
                          Edit
                        </Button>

                        <Modal
                          initialFocusRef={initialRef}
                          finalFocusRef={finalRef}
                          isOpen={isOpen}
                          onClose={onClose}
                        >
                          <ModalOverlay />
                          <ModalContent>
                            <ModalHeader>Update your form</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                              <section>
                                <form onSubmit={() => handleEdit(ele._id)}>
                                  <input
                                    type="text"
                                    required
                                    autoFocus
                                    value={name}
                                    placeholder="Enter Name"
                                    onChange={(e) => setName(e.target.value)}
                                  />
                                  <input
                                    type="number"
                                    maxLength="10"
                                    required
                                    value={mobile}
                                    placeholder="Enter Mobile Number"
                                    onChange={(e) => setMobile(e.target.value)}
                                  />
                                  <input
                                    type="email"
                                    placeholder="Enter Email Id"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                  />
                                  <input
                                    style={{
                                      width: "90%",
                                      backgroundColor: "teal",
                                      color: "white",
                                      borderRadius: "10px",
                                      cursor: "pointer",
                                    }}
                                    type="submit"
                                  />
                                </form>
                              </section>
                            </ModalBody>
                          </ModalContent>
                        </Modal>
                      </td>
                      <td>
                        <Button
                          onClick={() => hanleDelete(ele._id)}
                          height={5}
                          colorScheme="red"
                          variant="outline"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default Table;
