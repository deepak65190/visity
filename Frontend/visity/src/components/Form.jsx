import React, { useEffect, useState } from "react";
import axios from "axios";
import { list, useToast } from "@chakra-ui/react";
import "./form.module.css";

export default function Form() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleForm = (event) => {
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
      axios.post("http://localhost:8080/visity/form", data).then((res) => {
        toast({
          title: `${res.data}`,

          status: "success",
          duration: 2000,
          isClosable: true,
        });
      });
      
     window.location.reload()
    }
  };

  return (
    <div>
      <section>
        <form onSubmit={handleForm}>
          <h1>Web form </h1>
          <input
            type="text"
            required
            autoFocus
            placeholder="Enter Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            maxLength="10"
            required
            placeholder="Enter Mobile Number"
            onChange={(e) => setMobile(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter Email Id"
            required
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
    </div>
  );
}
