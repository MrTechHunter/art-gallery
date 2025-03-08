import React, { useState } from "react";
import { useUserData } from "../../../../contexts/UserDataProvider.js";
import { useAddress } from "../../../../contexts/AddressProvider.js";
import "../../CheckoutModal.css";
import {AddressModal} from "../AddressModal/AddressModal";

export const CheckoutModal = ({ isOpen, closeModal }) => {
    const { userDataState, dispatch } = useUserData();
    const { isAddressModalOpen, setIsAddressModalOpen } = useAddress();

    const [isValid, setIsValid] = useState(true); // Validation state
    const [errorMessage, setErrorMessage] = useState(""); // Error message for invalid form


    return (
        <div className={`modal ${isOpen ? "show" : ""}`}>
            <div className="modal-content">
                <h2>Checkout Summary</h2>

                <div className="order-summary">
                    <h3>Address</h3>
                    <div className="selected-address">
                        {userDataState.orderDetails?.orderAddress ? (
                            <p>{`${userDataState.orderDetails.orderAddress.name}, ${userDataState.orderDetails.orderAddress.street}, ${userDataState.orderDetails.orderAddress.city}, ${userDataState.orderDetails.orderAddress.state}, ${userDataState.orderDetails.orderAddress.country}, ${userDataState.orderDetails.orderAddress.pincode}`}</p>
                        ) : (
                            <p className="error-message">Please select a delivery address!</p>
                        )}
                    </div>
                    <h3>Order Summary</h3>
                    <p>Total: ${userDataState.orderDetails?.cartItemsDiscountTotal}</p>
                </div>

                {/* Validation Error */}
                {!isValid && <p className="error-message">{errorMessage}</p>}

                <button className="cancel-btn" onClick={closeModal}>
                    Close
                </button>

                {isAddressModalOpen && <AddressModal />}
            </div>
        </div>
    );
};