"use client"

import React, { useState } from 'react';
import styles from "./contactform.module.css";
import submitIcon from "../../../public/Icon_Submit.svg";
import Image from 'next/image';


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
    const [errors, setErrors] = useState({});

    // Functions to validate form inputs

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    const isValidPhoneNumber = (phoneNumber) => {
        return phoneNumber.trim().length <= 20 && phoneNumber.trim() !== '';
    };

    const isValidUKPostcode = (postcode) => {        
        return /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/.test(postcode);
    };
    
    // Form Validation

    const validateForm = () => {
        // Set aside an empty object to accept any validation errors

        const validationErrors = {};

        if(!formInputs.FullName.trim()) { // trim() used in case the user incorporates whitespace at either end of the entry
            validationErrors.FullName = "Required";
        }

        if(!formInputs.EmailAddress.trim() || !isValidEmail(formInputs.EmailAddress)){
            validationErrors.EmailAddress = "Invalid_Email_Address";
        }

        if(formInputs.PhoneNumbers.some(phoneNumber => !isValidPhoneNumber(phoneNumber))) {
            validationErrors.PhoneNumbers = "Invalid_Phone_Number";            
        }

        if(formInputs.Message.length > 500) {
            validationErrors.Message = "Max_Length_Exceeded";            
        }

        if(checked && !formInputs.AddressDetails.AddressLine1.trim()) {
            validationErrors.AddressLine1 = "Required";
        }

        if(checked && !formInputs.AddressDetails.CityTown.trim()) {
            validationErrors.CityTown = "Required";
        }

        if(checked && !formInputs.AddressDetails.StateCounty.trim()) {
            validationErrors.StateCounty = "Required";
        }

        if(checked && formInputs.AddressDetails.Postcode.trim() && !isValidUKPostcode(formInputs.AddressDetails.Postcode)) {
            validationErrors.Postcode = "Invalid_Postcode";
        }

        if(checked && !formInputs.AddressDetails.Country.trim()) {
            validationErrors.Country = "Required";
        }

        return validationErrors;
    }

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

        // Start by validating the form

        const validationErrors = validateForm();

        // If there are any errors, then set the validation errors and stop the form from submitting the input data

        if(Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // If form inputs are valid, then clear any pending errors, and continue with submission

        setErrors({});

        
        // While the form is being submitted, we want to show a loading state

        setSubmitting(true);

        try{ // Make a POST request to an external REST endpoint on form submission
            const response = await fetch("https://interview-assessment.api.avamae.co.uk/api/v1/contact-us/submit", {
                method: POST,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formInputs),
            });

            if(response.ok) {
                // If the form is successfully submitted
                setSubmitted(true);
                setFormInputs(initialFormInputs); // Clears the form fields
            } else {
                // If submission is unsuccessful, we need to now handle the API error
                const responseData = await response.json();

                if(responseData.Errors && responseData.Errors.length > 0) {
                    const apiError = {};
                    responseData.Errors.forEach((error) => {
                        const fieldName = error.FieldName.replace("AddressDetails.", "");
                        apiError[fieldName] = error.MessageCode;
                    });
                    setErrors(apiError);
                } else {
                    setErrors("An error has occurred"); // ?? setError
                }                
            };

        } catch(error) {
            // If there are any other errors, eg. network
            setErrors("An error has occurred");    //?? setError        
        } finally {
            setSubmitting(false);
        };
        
        console.log("Submitted form inputs:", formInputs)
        console.log(validationErrors)
    };
    
    return (
        
        <form 
            className={styles.container}
            onSubmit={handleFormSubmit}            
        >

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

                {/*Address line 2*/}

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