import React, { createContext, useContext, useState } from "react";
import api from "../services/api";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";

interface PropsStateContext {
    ListaDespesas: Function;
    despesas: Array<Object>;
    setDespesas: Function;
    DeletaDespesas: Function;
    editar: boolean;
    setEditar: Function;
    item: string;
    setItem: Function;
    value: string;
    setValue: Function;
    CriarDespesas: Function;
    modalVisible: boolean;
    setModalVisible: Function;
    loadingDespesas: boolean;
    setLoadingDespesas: Function;
    EditarDespesas: Function;
    idItem: string;
    setIdItem: Function;
    modalDetalhes: boolean;
    setModalDetalhes: Function;
    buscaDespesa: any;
    setBuscaDespesa: Function;
    BuscaDespesa: Function;
}

const StateContext = createContext<PropsStateContext>({} as PropsStateContext);

const StateContextProvider: React.FC = ({ children }) => {
    const [despesas, setDespesas] = useState([]);
    const [buscaDespesa, setBuscaDespesa] = useState({});
    const [editar, setEditar] = useState(false);
    const [item, setItem] = useState("");
    const [value, setValue] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [modalDetalhes, setModalDetalhes] = useState(false);
    const [loadingDespesas, setLoadingDespesas] = useState(false);
    const [idItem, setIdItem] = useState("");

    var data = new Date();
    var dia = String(data.getDate()).padStart(2, '0');
    var mes = String(data.getMonth() + 1).padStart(2, '0');
    var ano = data.getFullYear();
    var dataAtual = ano + '-' + mes + '-' + dia

    function ListaDespesas() {
        api.get(`/expenses?page=1&perPage=10`)
            .then((response) => {
                setDespesas(response.data);
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response);
                }
            });
    }

    function DeletaDespesas(id: string) {
        setLoadingDespesas(true);
        api.delete(`/expenses/${id}`)
            .then((response) => {
                ListaDespesas();
                setModalDetalhes(false);
                setLoadingDespesas(false);
            })
            .catch(function (error) {
                if (error.response) {
                    setLoadingDespesas(false);
                    console.log(error.response);
                }
            });
    }

    function CriarDespesas() {

        
    }



    function EditarDespesas(id: string) {
        setLoadingDespesas(true);
        api.put(`/expenses/${id}`, {
            date: dataAtual,
            item: item,
            value: value,
            additionalInfo: {},
        })
            .then((response) => {
                ListaDespesas();
                setLoadingDespesas(false);
                setModalVisible(!modalVisible);
                setItem("");
                setValue("");
            })
            .catch(function (error) {
                if (error.response) {
                    setLoadingDespesas(false);
                    console.log(error.response);
                }
            });
    }

    function BuscaDespesa(id: string) {
        setLoadingDespesas(true);
        api.get(`/expenses/${id}`)
            .then((response) => {
                setBuscaDespesa(response.data);
                setLoadingDespesas(false);
            })
            .catch(function (error) {
                if (error.response) {
                    setLoadingDespesas(false);
                    console.log(error.response);
                }
            });
    }

    return (
        <StateContext.Provider
            value={{
                ListaDespesas,
                despesas,
                setDespesas,
                DeletaDespesas,
                editar,
                setEditar,
                item,
                setItem,
                value,
                setValue,
                CriarDespesas,
                modalVisible,
                setModalVisible,
                loadingDespesas,
                setLoadingDespesas,
                EditarDespesas,
                idItem,
                setIdItem,
                modalDetalhes,
                setModalDetalhes,
                buscaDespesa,
                setBuscaDespesa,
                BuscaDespesa,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export { StateContextProvider };
export default StateContext;
