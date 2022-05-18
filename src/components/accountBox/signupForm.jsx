import React, { useContext, useState } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from "./accountContext";

const initialFormData = Object.freeze({
  username: "",
  email: "",
  password: "",
  phone: "",
  birthDate: "",
  address: ""
});

export function SignupForm(props) {
  const { switchToSignin } = useContext(AccountContext);

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,

      // Trimming any whitespace
      [e.target.name]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);

    const contractInterface = props.props.props.props; 
    try{
      await contractInterface.addUser(contractInterface.identityManagerContract, formData.email, formData.password, formData.username, formData.phone, formData.birthDate, formData.address);
      switchToSignin();
    } catch(e){
      console.log(e);
      alert("Something went wrong...");
    }
    // ... submit to API or something
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" onChange={handleChange} name="username" placeholder="Full Name" />
        <Input type="email" onChange={handleChange} name="email" placeholder="Email" />
        <Input type="password" onChange={handleChange} name="password" placeholder="Password" />
        <Input type="tel" onChange={handleChange} name="phone" placeholder="Phone Number" />
        <Input type="text" onChange={handleChange} name="birthDate" placeholder="Birth Date" />
        <Input type="text" onChange={handleChange} name="address" placeholder="Address" />
      </FormContainer>
      <Marginer direction="vertical" margin={20} />
      <SubmitButton type="submit" onClick={handleSubmit}>Signup</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Already have an account?
        <BoldLink href="#" onClick={switchToSignin}>
          Signin
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
