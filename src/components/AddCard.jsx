import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewCard } from "./service/apiCard";

function AddCard() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [card, setCard] = useState({
    title: "",
    subtitle: "",
    description: "",
    phone: "",
    email: "",
    web: "",
    image: {
      url: "",
      alt: "",
    },
    address: {
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: "",
    },
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    } else {
      console.log("No token found in localStorage");
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
          ? ""
          : "Please enter a valid email address";
      case "phone":
        return /^((((\+972)|0)(([234689]\d{7})|([57]\d{8}))|(1[5789]\d{8}))|\*\d{3,6})$/.test(
          value
        )
          ? ""
          : "Please enter a valid Israeli phone number";
      case "web":
        return /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/\S*)?$/.test(
          value
        )
          ? ""
          : "Please enter a valid web address";
      case "url":
        return /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/.test(
          value
        )
          ? ""
          : "Please enter a valid image URL address";
      default:
        return value.trim() ? "" : `${name} is required`;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCard((prevCard) => {
      if (name.includes(".")) {
        const [objectKey, subKey] = name.split(".");
        return {
          ...prevCard,
          [objectKey]: {
            ...prevCard[objectKey],
            [subKey]: value,
          },
        };
      }
      return { ...prevCard, [name]: value };
    });

    // Validate the field as it's being changed
    const error = validateField(
      name.includes(".") ? name.split(".")[1] : name,
      value
    );
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    const newErrors = {};
    let hasErrors = false;

    // Validate all fields
    Object.entries(card).forEach(([key, value]) => {
      if (typeof value === "object") {
        Object.entries(value).forEach(([subKey, subValue]) => {
          const fullKey = `${key}.${subKey}`;
          const error = validateField(subKey, subValue);
          if (error) {
            newErrors[fullKey] = error;
            hasErrors = true;
          }
        });
      } else {
        const error = validateField(key, value);
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        }
      }
    });
    setErrors(newErrors);

    if (hasErrors) {
      return;
    }

    const formattedCard = {
      ...card,
      address: {
        ...card.address,
        houseNumber: Number(card.address.houseNumber),
        zip: card.address.zip ? Number(card.address.zip) : undefined,
      },
    };

    try {
      const response = await createNewCard(token, card);
      console.log("Card created successfully:", response);
      navigate("/MyCardsPage");
    } catch (error) {
      console.error("Error in handleSave:", error);
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        console.error("Error response status:", error.response.status);
        console.error("Error response data:", error.response.data);
        errorMessage =
          error.response.data.message ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        console.error("Error request:", error.request);
        errorMessage =
          "No response received from server. Please check your internet connection.";
      } else {
        console.error("Error message:", error.message);
        errorMessage = error.message;
      }

      setErrors({ server: errorMessage });
    }
  };

  const renderField = (name, label, required = false, type = "text") => (
    <div className="col">
      <label className="form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      <input
        type={type}
        className="form-control"
        name={name}
        value={
          name.includes(".")
            ? card[name.split(".")[0]][name.split(".")[1]]
            : card[name]
        }
        onChange={handleInputChange}
      />
      {errors[name] && <div className="text-danger">{errors[name]}</div>}
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4">
            <h3 className="text-center mb-4">Add New Card</h3>
            {errors.server && (
              <div className="alert alert-danger">{errors.server}</div>
            )}
            <form onSubmit={handleSave}>
              <div className="row mb-3">
                {renderField("title", "Title", true)}
                {renderField("subtitle", "Subtitle", true)}
                {renderField("description", "Description", true)}
              </div>
              <div className="row mb-3">
                {renderField("phone", "Phone", true)}
              </div>
              <div className="row mb-3">
                {renderField("email", "Email", true)}
              </div>
              <div className="row mb-3">{renderField("web", "Web", true)}</div>
              <div className="row mb-3">
                {renderField("image.url", "Image URL", true)}
                {renderField("image.alt", "Image Alt", true)}
              </div>
              <div className="row mb-3">
                {renderField("address.state", "State", true)}
                {renderField("address.country", "Country", true)}
                {renderField("address.city", "City", true)}
                {renderField("address.street", "Street", true)}
                {renderField("address.houseNumber", "House Number", true)}

                {renderField("address.zip", "Zip", true, "number")}
              </div>
              <div className="row">
                <div className="col">
                  <button type="submit" className="btn btn-primary me-2">
                    Add
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => navigate("/CardListPage")}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCard;
