import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

interface PropsStateContext {
    ListaDespesas: Function;
    despesas: Array<Object>;
    setDespesas: Function;
    DeletaDespesas: Function;
}

const StateContext = createContext<PropsStateContext>({} as PropsStateContext);

const StateContextProvider: React.FC = ({ children }) => {
    const [ despesas, setDespesas ] = useState([])

    function ListaDespesas() {
        api.get(`/expenses?page=1&perPage=10`)
            .then((response) => {
                setDespesas(response.data)
                console.log(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }
    function DeletaDespesas(id: string) {
        api.delete(`/expenses/${id}`)
            .then((response) => {
                ListaDespesas();
                console.log(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    return <StateContext.Provider value={{
        ListaDespesas,
        despesas, 
        setDespesas,
        DeletaDespesas
    }}>{children}</StateContext.Provider>;
};

export { StateContextProvider };
export default StateContext;
