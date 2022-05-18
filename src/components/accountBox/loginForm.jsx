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
import { useNavigate } from "react-router-dom";

const initialFormData = Object.freeze({ email: "", password: "" });

export function LoginForm(props) {
  const { switchToSignup } = useContext(AccountContext);

  const [formData, updateFormData] = useState(initialFormData);

  const navigate = useNavigate();

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
    // try {
      const contractInterface = props.props.props.props; 
      const res = await contractInterface.login(contractInterface.identityManagerContract, formData.email, formData.password);
      if (res) {
        const userID = await contractInterface.getUserIdByEmail(contractInterface.identityManagerContract, formData.email);
        localStorage.setItem('userId', JSON.stringify(userID.id));
        localStorage.setItem('userAddress', JSON.stringify(userID.userAddress));
        navigate('/allusers');
      } else {
        alert('Email or Password is incorrect.');
      }
    // } catch {
    //   alert('Email or Password is incorrect.');
    // }

    // ... submit to API or something
  };

  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email"  onChange={handleChange} name="email" placeholder="Email" />
        <Input type="password"  onChange={handleChange} name="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin={10} />
      <MutedLink href="#">Forget your password?</MutedLink>
      <Marginer direction="vertical" margin="1.6em" />
      <SubmitButton onClick={handleSubmit} type="submit">Signin</SubmitButton>
      <Marginer direction="vertical" margin="1em" />
      <MutedLink href="#">
        Don't have an accoun?{" "}
        <BoldLink href="#" onClick={switchToSignup}>
          Signup
        </BoldLink>
      </MutedLink>
    </BoxContainer>
  );
}
