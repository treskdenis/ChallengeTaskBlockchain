import React, { useContext, useState } from "react";
import './AddUserCard.css';
import {
  FormContainer,
  SubmitButton,
  Input,
} from "../accountBox/common";
import { Marginer } from "../marginer";

const initialFormData = Object.freeze({ groupName: "", email: "" });

export function AddUserCard(props) {
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
        const groupId = await contractInterface.getGroupId(contractInterface.identityManagerContract, formData.groupName);
        const qwe = await contractInterface.addUserToGroup(contractInterface.identityManagerContract, formData.email, groupId);
        console.log("sender:");
        console.log(qwe);
        window.location.reload();
    };

    return (
        <div className="add-user-card">
            <div className="card__title">Add User To Group</div>
            <div className="card__body add-user-card-margin">
                <FormContainer>
                    <Input type="text" onChange={handleChange} name="groupName" placeholder="Group Name" />
                    <Input type="email" onChange={handleChange} name="email" placeholder="User Email" />
                </FormContainer>
                <Marginer direction="vertical" margin={25} />
                <SubmitButton type="submit" onClick={handleSubmit}>Add User</SubmitButton>
                <Marginer direction="vertical" margin="1em" />
            </div>
        </div>
    )
};
