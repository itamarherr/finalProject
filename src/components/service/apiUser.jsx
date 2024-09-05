import axios from "axios";
import { BaseAPI } from "../constants";

const api = axios.create({
  baseURL: BaseAPI,
});

export const loginUser = async (email, password) => {
  try {
    const response = await api.post(`users/login/`, {
      email: email,
      password: password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (user) => {
  const postUser = {
    name: {
      first: user.first,
      middle: user.middle,
      last: user.last,
    },
    email: user.email,
    phone: user.phone,
    password: user.password,
    image: {
      url: user.url,
      alt: user.alt,
    },
    address: {
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      houseNumber: user.houseNumber,
      zip: user.zip,
    },
    isBusiness: user.isBusiness,
  };
  try {
    const response = await api.post("users/", postUser);

    return response;
  } catch (error) {
  }
};

export const updateUser = async () => {
  try {
    const response = await api.put(
      `/user/6559f2dbdedf2db2b52bde42`,
      {
        name: {
          first: "",
          middle: "",
          last: "",
        },
        phone: "",
        image: {
          url: "",
          alt: "",
        },
        address: {
          state: "",
          country: "",
          city: "",
          street: "",
          houseNumber: 5,
          zip: 8920435,
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
    throw error;
  }
};

export const getUser = () => {
  return api
    .get(`/user/65424ae9a8d1eae12d31e360`, {
      _id: "65424862a8d1eae12d31e340",
      name: {
        first: "business",
        middle: "Man",
        last: "user",
        _id: "65424862a8d1eae12d31e341",
      },
      phone: "0512345567",
      image: {
        url: "",
        alt: "",
        _id: "65424862a8d1eae12d31e342",
      },
      address: {
        state: "IL",
        country: "Israel",
        city: "Arad",
        street: "Shoham",
        houseNumber: 5,
        zip: 8920435,
        _id: "65424862a8d1eae12d31e343",
      },
    })
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};
