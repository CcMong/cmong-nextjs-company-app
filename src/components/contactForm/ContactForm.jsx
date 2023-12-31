"use client"

import React, { useState } from 'react';
import styles from "./contactform.module.css";
import submitIcon from "../../../public/Icon_Submit.svg";
import Image from 'next/image';
import Submitted from '../submitted/Submitted';


const ContactForm = () => {

    {/*State For the Address Checkbox */}
    const [checked, setChecked] = useState(false);

    const initialFormInputs = {
        FullName: "",
        EmailAddress: "",
        PhoneNumbers: [""], // This will be initialised as an array to allow for users to add more numbers within the form
        Message: "",
        bIncludeAddressDetails: false,
        AddressDetails: {
            AddressLine1: "",
            AddressLine2: "",
            CityTown: "",
            StateCounty: "",
            Postcode: "",
            Country: "",
        },
    }
   
    const [formInputs, setFormInputs] = useState(initialFormInputs);


    // Managing state for form submission and errors

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [apiValidated, setApiValidated] = useState(true);
    const [allValidationErrors, setAllValidationErrors] = useState([])

    
    /*Function for handling changes in the form inputs */

    const handleChange = (e, index) => {
        const { name, value } = e.target;
        const updatedPhone = [...formInputs.PhoneNumbers];
        updatedPhone[index] = value;

        setFormInputs({ ...formInputs, PhoneNumbers: updatedPhone });
        
    };

    /*Function for adding new phone numbers */

    const handleExtraPhone = (e) => {
        setFormInputs({ ...formInputs, PhoneNumbers: [...formInputs.PhoneNumbers, ""]});        
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        const data = formInputs;

        console.log(data);
               
        // While the form is being submitted, we want to show a loading state

        setSubmitting(true);

        try{ // Make a POST request to an external REST endpoint on form submission
            const response = await fetch("https://interview-assessment.api.avamae.co.uk/api/v1/contact-us/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            // Getting the response as soon as the form is submitted: 

            const responseData1 = await response.json();
            const validationErrorsArray = responseData1.Errors; // Errors received from the API

            if(validationErrorsArray) {
                setApiValidated(false);

                setAllValidationErrors(validationErrorsArray);

            }

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            // if everything is okay with the request:

            setSubmitted(true);
            setFormInputs(initialFormInputs); // Clears the form fields
            
        } catch(error) {
            // If there are any other errors, 
            console.log(`A problem was encountered during fetch - ${error.message}`);

        } finally {
            setSubmitting(false);
            setApiValidated(true);
        };        
    };
    
    return (

        // When the form is successfully submitted, the valid submission component will be shown to the user:

      submitted ? <div><Submitted /></div> 
      
      :

        // Otherwise, they will see the contact form:
        
        <form 
            className={styles.container}
            onSubmit={handleFormSubmit}            
        >
            {/* Error message to appear at the top of the form to alert user */}
            {allValidationErrors && <div>{allValidationErrors.map((validationErrorObject, index) => (
                <p key={index}className={styles.userError}>{`* ${validationErrorObject.MessageCode === "Invalid_Email_Address" ? "Please provide a valid email address" 
                : validationErrorObject.MessageCode === "Invalid_Phone_Number" ? "Phone number is invalid. Cannot exceed 20 characters, and cannot be null or empty" 
                : validationErrorObject.MessageCode === "Max_Length_Exceeded" ? "The message provided exceeds the maximum length allowed of 500 characters" 
                : validationErrorObject.MessageCode === "Invalid_Postcode" ? "Please enter a valid UK postcode" : ""}`}</p>
            ))}</div>}

            {/*Fullname and Email */}
            <div className={styles.input_group}>
                <div className={styles.inputs}>
                    <label htmlFor='FullName'>Full name</label>
                    <input 
                        type="text" 
                        id="FullName"
                        name="FullName"
                        className={styles.inputField}
                        value={formInputs.FullName}
                        onChange={(e) => setFormInputs({...formInputs, FullName: e.target.value })} 
                        required
                    />
                </div>

                <div className={styles.inputs}>
                    <label htmlFor='EmailAddress'>Email address</label>
                    <input 
                        type="email" 
                        id="EmailAddress"
                        name="EmailAddress"
                        value={formInputs.EmailAddress}
                        className={styles.inputField}
                        onChange={(e) => setFormInputs({ ...formInputs, EmailAddress: e.target.value })}
                        required
                    />
                </div>
            </div>

            {/*Phone Numbers */}
            
            <div className={styles.input_group_col}>
                
                {formInputs.PhoneNumbers.map((phoneNumber, index) => (
                    <div className={styles.inputs} key={index}>
                        <label>Phone Number <span>{String(index + 1).padStart(2, "0")}</span> <span className={styles.tagline}>- optional</span></label>
                        <input 
                            type="tel" 
                            id="PhoneNumbers"
                            name="PhoneNumbers"
                            value={phoneNumber}
                            className={styles.inputField}
                            onChange={(e) => handleChange(e, index)}
                            maxLength={20} // Cannot exceed 20 characters
                        />
                    </div>
                ))}
            </div>

            <button     
                type="button"            
                className={styles.add}
                onClick={handleExtraPhone}
            >
                Add new phone number
            </button>

            {/*Message */}
            <div className={styles.input_group}>
                <div className={styles.inputs}>
                    <label htmlFor='Message' className={styles.messageLabel}>
                        <p>Message</p>
                        <p className={styles.messageTagline}>Maximum text length is 500 characters</p>
                    </label>
                    <textarea 
                        rows={10} 
                        id="Message"
                        name="Message"
                        value={formInputs.Message}
                        className={styles.textarea}
                        onChange={(e) => setFormInputs({ ...formInputs, Message: e.target.value })}
                        required
                        maxLength={500}
                    />
                </div>
            </div>

            {/* Address checkbox*/}

            <label className={styles.addCheck}> 
                <div className={styles.inputWrapper}>
                    <input 
                        type="checkbox"
                        defaultChecked={checked}
                        onChange={() => {
                            setChecked(!checked);
                            setFormInputs({ ...formInputs, bIncludeAddressDetails: !formInputs.bIncludeAddressDetails })
                        }} 
                    />
                </div>           
                            
                <span className={styles.addDetails}>Add address details</span>
            </label>

            {/*Address section */}
            {checked && (
            <>
                <div className={styles.input_group}>
                    <div className={styles.inputs}>
                        <label htmlFor='AddressDetails.AddressLine1'>Address line 1</label>
                        <input 
                            type="text" 
                            id="AddressDetails.AddressLine1"
                            name="AddressDetails.AddressLine1"
                            value={formInputs.AddressDetails.AddressLine1}
                            className={styles.inputField}
                            onChange={(e) => setFormInputs({ ...formInputs,
                                AddressDetails: {
                                    ...formInputs.AddressDetails, AddressLine1: e.target.value, }, })}
                            required
                        />
                    </div>

                    <div className={styles.inputs}>
                    <label htmlFor='AddressDetails.AddressLine2'>Address line 2 <span className={styles.tagline}>- optional</span></label>
                        <input 
                            type="text" 
                            id="AddressDetails.AddressLine2"
                            name="AddressDetails.AddressLine2"
                            value={formInputs.AddressDetails.AddressLine2}
                            className={styles.inputField}
                            onChange={(e) => setFormInputs({ ...formInputs,
                                AddressDetails: {
                                    ...formInputs.AddressDetails, AddressLine2: e.target.value, 
                                }, 
                            })}
                        />
                    </div>
                </div>

                {/*Address row 2*/}

                <div className={styles.grid}>
                    <div className={styles.inputs}>
                        <label htmlFor='AddressDetails.CityTown'>City/Town</label>
                        <input 
                            type="text" 
                            id="AddressDetails.CityTown"
                            name='AddressDetails.CityTown'
                            value={formInputs.AddressDetails.CityTown}
                            className={styles.inputField}
                            onChange={(e) => setFormInputs({ ...formInputs, 
                                AddressDetails: {
                                    ...formInputs.AddressDetails, CityTown: e.target.value,
                                },
                            })}
                            required
                        />
                    </div>

                    <div className={styles.inputs}>
                        <label htmlFor='AddressDetails.StateCounty'>State/County</label>
                        <input 
                            type="text" 
                            id="AddressDetails.StateCounty"
                            name='AddressDetails.StateCounty'
                            value={formInputs.AddressDetails.StateCounty}
                            className={styles.inputField}
                            onChange={(e) => setFormInputs({ ...formInputs, 
                                AddressDetails: {
                                    ...formInputs.AddressDetails, StateCounty: e.target.value,
                                },
                            })}
                            required
                        />
                    </div>

                    <div className={styles.inputs}>
                        <label htmlFor='AddressDetails.Postcode'>Postcode</label>
                        <input 
                            type="text" 
                            id="AddressDetails.Postcode"
                            name='AddressDetails.Postcode'
                            value={formInputs.AddressDetails.Postcode}
                            className={styles.inputField}
                            onChange={(e) => setFormInputs({ ...formInputs, 
                                AddressDetails: {
                                    ...formInputs.AddressDetails, Postcode: e.target.value,
                                },
                            })}
                            required
                        />
                    </div>

                    <div className={styles.inputs}>
                        <label htmlFor='AddressDetails.Country'>Country</label>
                        <input 
                            type="text" 
                            id="AddressDetails.Country"
                            name='AddressDetails.Country'
                            value={formInputs.AddressDetails.Country}
                            className={styles.inputField}
                            onChange={(e) => setFormInputs({ ...formInputs, 
                                AddressDetails: {
                                    ...formInputs.AddressDetails, Country: e.target.value,
                                },
                            })}
                            required
                        />
                    </div>
                </div>
            </>                
            )}
            
            <button type="submit" className={styles.submit} disabled={submitting}>
                <Image src={submitIcon} alt="submit icon" width={15} height={15} className={styles.sendIcon}/>
                <p className={styles.submitText}>{submitting ? "Submitting..." : "Submit"}</p>
            </button>            
        </form>
    )
}

export default ContactForm;

// With more time, and as a basis for improvement, I would have undertaken and tested a more bespoke validation of the form. My code/pseudocode is shown below:

// // Functions to validate Form Inputs
/*-------------------------------------- */

// const isValidEmail = (email) => {
//     return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// const isValidPhoneNumber = (phoneNumber) => {
//     return phoneNumber.trim().length <= 20 && phoneNumber.trim() !== '' && phoneNumber.trim() !== 0;
// };

// const isValidUKPostcode = (postcode) => {        
//     return /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/.test(postcode);
// };

// Function for Form Validation
/*----------------------------- */

// const validateForm = () => {

//     // Set aside an empty object to accept any validation errors

//     const validationErrors = {};

//     if(!formInputs.FullName.trim()) { 
//         validationErrors.FullName = "Required";
//     }

//     if(!formInputs.EmailAddress.trim() || !isValidEmail(formInputs.EmailAddress)){
//         validationErrors.EmailAddress = "Invalid_Email_Address";
//     }

//     if(formInputs.PhoneNumbers.some(phoneNumber => !isValidPhoneNumber(phoneNumber))) {
//         validationErrors.PhoneNumbers = "Invalid_Phone_Number";            
//     }

//     if(formInputs.Message.length > 500) {
//         validationErrors.Message = "Max_Length_Exceeded";            
//     }

//     if(checked && !formInputs.AddressDetails.AddressLine1.trim()) {
//         validationErrors.AddressLine1 = "Required";
//     }

//     if(checked && !formInputs.AddressDetails.CityTown.trim()) {
//         validationErrors.CityTown = "Required";
//     }

//     if(checked && !formInputs.AddressDetails.StateCounty.trim()) {
//         validationErrors.StateCounty = "Required";
//     }

//     if(checked && formInputs.AddressDetails.Postcode.trim() && !isValidUKPostcode(formInputs.AddressDetails.Postcode)) {
//         validationErrors.Postcode = "Invalid_Postcode";
//     }

//     if(checked && !formInputs.AddressDetails.Country.trim()) {
//         validationErrors.Country = "Required";
//     }

//     return validationErrors;
// }

/************************************************** */

// Then I would call this validateForm() function within the handleFormSubmit function in the first instance, to validate the form before further operations can take place.