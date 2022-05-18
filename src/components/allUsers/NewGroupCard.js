import React, { useContext, useState } from "react";
import './NewGroupCard.css';
import {
  FormContainer,
  SubmitButton,
  Input,
} from "../accountBox/common";
import { Marginer } from "../marginer";

const initialFormData = Object.freeze({ groupName: "" });

export function NewGroupCard(props) {
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
        const contractInterface = props.props.props.props; 
        await contractInterface.addGroup(contractInterface.identityManagerContract, JSON.parse(localStorage.getItem("userId")), formData.groupName);
        window.location.reload();
    };

    return (
        <div className="new-card">
            <div className="card__title">Add New Group</div>
            <div className="card__body new-card-margin">
                <FormContainer>
                    <Input type="text" onChange={handleChange} name="groupName" placeholder="Group Name" />
                </FormContainer>
                <Marginer direction="vertical" margin={25} />
                <SubmitButton type="submit" onClick={handleSubmit}>Create Group</SubmitButton>
                <Marginer direction="vertical" margin="1em" />
            </div>
        </div>
    )
};
