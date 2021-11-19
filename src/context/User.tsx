import React, { createContext, useState } from "react";
import { Alert } from "react-native";
import api from "../services/api";

type UserType = {
    id: string;
    email: string;
    token: string;
};

type PropsUserContext = {
    user: UserType;
    setUser: Function;
    Start: Function;
};

const DEFAULT_VALUE: UserType = {
    id: "",
    email: "",
    token: "",
};

const UserContext = createContext<PropsUserContext>({} as PropsUserContext);

const UserContextProvider: React.FC = ({ children }) => {
    const [user, setUser] = useState(DEFAULT_VALUE);

    const Start = async (email: string) => {
        try {
            const response: any = await api.get(`/start/${email}`, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            let valor = {
                id: response.data._id,
                email: response.data.email,
                token: response.data.token,
            };
            setUser(valor);
            console.log(user.token)
            api.defaults.headers.common = {
                Authorization: `Bearer ${response.data.token}`,
            };
            return true;
        } catch (error: any) {
            Alert.alert(error.response.data.error_description);
            return false;
        }
    };

    return (
        <UserContext.Provider
            value={{
                user: user,
                setUser,
                Start
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
export { UserContextProvider };
export default UserContext;
