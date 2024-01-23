import {useContext} from "react";
import { LoginContext } from "../Context/AuthProvider";

const useLogin = ()=> useContext(LoginContext);


export default useLogin;