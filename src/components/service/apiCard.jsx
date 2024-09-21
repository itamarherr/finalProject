import axios from "axios";
import { BaseAPI } from "../constants";

const api = axios.create({
  baseURL: BaseAPI
});

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
export const getCard = async () => {

  try {
    const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/`, {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting item:", error);
    throw error;
  }
};

export const getAllMyCards = async () => {

  try {
    const response = await axios.get(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/my-cards`, {
      headers: {
        "x-auth-token": localStorage.getItem("token")
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error posting item:", error);
    throw error;
  }
};


export const updateCard = async (token, card, id) => {
  console.log("Card Data:", card); // Log the entire card object
  console.log("Address Data:", card.address); // Log the address part of the card
  try {

    const response = await axios.put(
      `https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${id}`,
     
      {
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        image: {
          url: card.image.url,
          alt: card.image.alt,
        },
        address: {
          state: card.address.state,
          country: card.address.country,
          city: card.address.city,
          street: card.address.street,
          houseNumber: +card.address.houseNumber,
          zip: +card.address.zip,
        },
      },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error updating item:", error);
    throw error;
  }
};



export const deleteCard = async (cardId) => {
  try {
    const response = await axios.delete(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/${cardId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export const createNewCard = async (token, card) => {
  try {
    console.log("Token:", token);
    const response = await api.post(`https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards/`,
      {
        title: card.title,
        subtitle: card.subtitle,
        description: card.description,
        phone: card.phone,
        email: card.email,
        web: card.web,
        image: {
          url: card.url,
          alt: card.alt,
        },
        address: {
          state: card.state,
          country: card.country,
          city: card.city,
          street: card.street,
          houseNumber: +card.houseNumber,
          zip: +card.zip,
        },
      },
      {
        headers: {
          "x-auth-token": token,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error posting item:", error);
    throw error;
  }
};
