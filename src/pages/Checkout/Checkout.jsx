import { useState } from "react";
import { CheckoutModal } from "./components/CheckoutModal/CheckoutModal";
import { useNavigate } from "react-router-dom";
import { useData } from "../../contexts/DataProvider.js";
import { useUserData } from "../../contexts/UserDataProvider.js";
import "./Checkout.css";
import { AddressSection } from "./components/AddressSection/AddressSection";
import { OrderSummary } from "./components/OrderSummary/OrderSummary";

export const Checkout = () => {
    const { userDataState } = useUserData();
    const navigate = useNavigate();
    const { loading } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        !loading &&
        (userDataState.cartProducts.length ? (
            <div className="review-container">
                <h1 className="page-heading">Checkout!</h1>
                <button className="checkout-btn" onClick={openModal}>
                    Review Order
                </button>

                <div className="checkout-container">
                    <AddressSection />
                    <OrderSummary />
                </div>

                {/* Checkout Modal */}
                <CheckoutModal isOpen={isModalOpen} closeModal={closeModal} />
            </div>
        ) : (
            <div className="no-items-container">
                <h2 className="page-heading">No items in your cart to Checkout!</h2>
                <button
                    className="explore-btn"
                    onClick={() => navigate("/product-listing")}
                >
                    Explore
                </button>
            </div>
        ))
    );
};