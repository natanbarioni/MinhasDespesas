import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    BtnAdicionar,
    Container,
    ContainerVazio,
    SubTitlePage,
    TitlePage,
    TxtAdicionar,
    TxtVazio,
    ContainerIndividual,
    ContainerItem,
    ContainerLeft,
    ContainerRight,
    Data,
    Valor,
    Despesa,
    Row,
    CenteredView,
    ModalView,
    BtnDespesa,
    TxtDespesa,
    ViewClose,
    TxtCancelar,
    Input,
    Label,
    ContainerLoading,
    BtnSair,
    ClearListButton,
    ClearListButtonText,
    LengthExpenses,
} from "./Home.styled";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { Colors } from "../../styles";
import moment from "moment";
import StateContext from "../../context/States";
import {
    FlatList,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    Alert,
} from "react-native";
import UserContext from "../../context/User";
import Toast from "react-native-toast-message";
import uuid from "react-native-uuid";

export default function Home({ navigation }: any) {
    const {
        ListaDespesas,
        despesas,
        DeletaDespesas,
        item,
        //setItem,
        CriarDespesas,
        setEditar,
        editar,
        EditarDespesas,
        setIdItem,
        idItem,
        setModalDetalhes,
        modalDetalhes,
        BuscaDespesa,
        buscaDespesa,
    } = useContext(StateContext);

    const { getItem, setItem, removeItem } = useAsyncStorage(
        "@myexpenses:expenses"
    );
    const [loadingDespesas, setLoadingDespesas] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [items, setItems] = useState([]);
    const [expense, setExpense] = useState("");
    const [value, setValue] = useState("");
    const [activeEditItem, setActiveEditItem] = useState({});
    const [totalExpense, setTotalExpense] = useState("");
    let data = new Date();
    let dia = String(data.getDate()).padStart(2, "0");
    let mes = String(data.getMonth() + 1).padStart(2, "0");
    let ano = data.getFullYear();
    let dataAtual = dia + "/" + mes + "/" + ano;

    function numberToReal(numero: any) {
        var numero = numero.toFixed(2).split(".");
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
        return numero.join(",");
    }

    const validar = () => {
        let error = false;

        if (expense == "" || value == "") {
            alert("Preencha os campos corretamente.");
            error = true;
        }

        return !error;
    };

    async function handleFetchData() {
        const response = await getItem();
        const data = response ? JSON.parse(response) : [];
        setItems(data);

        let arrayExpenses = data.map((item) => Math.round(item.value));
        let totalExpenses = arrayExpenses.reduce(function (soma, i) {
            return soma + i;
        });
        setTotalExpense(totalExpenses);
    }

    async function handleOpenEdit(id: string) {
        const response = await getItem();
        const previousData = response ? JSON.parse(response) : [];
        previousData.filter((item) => {
            if (item._id === id) {
                setExpense(item.item);
                setValue(item.value);
            }
        });
    }

    async function handleEdit(item: any) {
        const response = await getItem();
        const data = JSON.parse(response);
        const editItem = [...data].map((i: any) => {
            if (i._id === item._id) {
                return {
                    ...i,
                    item: expense,
                    date: dataAtual,
                    value: value,
                };
            } else {
                return i;
            }
        });
        await setItem(JSON.stringify(editItem));
        handleFetchData();
        setExpense("");
        setValue("");
        Toast.show({
            type: "success",
            text1: "Editado com sucesso!",
        });
        setEditar(false);
        setModalVisible(!modalVisible);
    }

    async function handleRemoveAll() {
        Alert.alert("Deseja limpar toda sua lista?", "", [
            {
                text: "Sim",
                onPress: async () => {
                    await removeItem();
                    setItems([]);
                    setTotalExpense("")
                },
                style: "cancel",
            },
            {
                text: "Não",
                onPress: () => {
                    return;
                },
            },
        ]);
    }

    // async function fetchDataId(id: string) {
    //     const response = await getItem();
    //     const previousData = response ? JSON.parse(response) : [];
    //     const data = previousData.filter((item) => {
    //         if (item._id === id) {
    //             // condição
    //         }
    //     });
    // }

    // useCallback(() => {
    //     fetchDataId()
    // }, [editar])

    async function handleNew() {
        try {
            const id = uuid.v4();

            const newData = {
                _id: id,
                item: expense,
                date: dataAtual,
                value: value,
            };

            const response = await getItem();
            const previousData = response ? JSON.parse(response) : [];

            const data = [...previousData, newData];

            await setItem(JSON.stringify(data));
            setModalVisible(!modalVisible);
            handleFetchData();
            setExpense("");
            setValue("");
            Toast.show({
                type: "success",
                text1: "Cadastrado com sucesso!",
            });
        } catch (error) {
            console.log(error);

            Toast.show({
                type: "error",
                text1: "Não foi possível cadastrar.",
            });
        }
    }

    async function handleRemove(id: string) {
        Alert.alert("Deseja remover esse item da sua lista?", "", [
            {
                text: "Sim",
                onPress: async () => {
                    const response = await getItem();
                    const previousData = response ? JSON.parse(response) : [];

                    const data = previousData.filter((item) => item._id !== id);
                    setItem(JSON.stringify(data));
                    setItems(data);
                    handleFetchData();
                },
                style: "cancel",
            },
            {
                text: "Não",
                onPress: () => {
                    return;
                },
            },
        ]);
    }

    useEffect(() => {
        //removeItem()
        handleFetchData();
    }, []);

    if (loadingDespesas) {
        return (
            <ContainerLoading>
                <ActivityIndicator color={Colors.PRIMARY} size="large" />
            </ContainerLoading>
        );
    }

    return (
        <Container>
            <TitlePage>Seja bem-vindo(a)!</TitlePage>
            {items.length >= 1 && (
                <SubTitlePage>
                    Valor total das despesas:{" "}
                    {numberToReal(parseInt(totalExpense))}
                </SubTitlePage>
            )}
            {items.length == 0 ? (
                <ContainerVazio>
                    <Icon
                        name={"format-list-bulleted"}
                        size={60}
                        color={Colors.GREY_LIGHT}
                    />
                    <TxtVazio>Nenhuma despesa adicionada.</TxtVazio>
                    <BtnAdicionar
                        onPress={() => {
                            setModalVisible(true);
                        }}
                    >
                        <TxtAdicionar>Criar despesa</TxtAdicionar>
                    </BtnAdicionar>
                </ContainerVazio>
            ) : (
                <>
                    <BtnAdicionar
                        onPress={() => {
                            setExpense("");
                            setValue("");
                            setModalVisible(true);
                        }}
                    >
                        <MaterialIcons
                            name={"add"}
                            size={40}
                            color={Colors.WHITE}
                        />
                    </BtnAdicionar>
                    <FlatList
                        style={{ marginTop: 20, marginBottom: 15 }}
                        data={items}
                        renderItem={({ item }: any) => (
                            <ContainerItem
                            // onPress={() => {
                            //     BuscaDespesa(item._id);
                            //     setModalDetalhes(true);
                            // }}
                            >
                                <Row>
                                    <ContainerLeft>
                                        <Despesa>{item.item}</Despesa>
                                        <ContainerIndividual>
                                            <Data>{item.date}</Data>
                                        </ContainerIndividual>
                                        <ContainerIndividual>
                                            <Valor>
                                                {numberToReal(
                                                    parseInt(item.value)
                                                )}
                                            </Valor>
                                        </ContainerIndividual>
                                    </ContainerLeft>
                                    <ContainerRight>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setItem(item);
                                                setEditar(true);
                                                setModalVisible(true);
                                                handleOpenEdit(item._id);
                                                setActiveEditItem(item);
                                            }}
                                            style={{ marginBottom: 20 }}
                                        >
                                            <Icon
                                                name={"square-edit-outline"}
                                                size={30}
                                                color={Colors.EDITAR}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleRemove(item._id)
                                            }
                                        >
                                            <Icon
                                                name={"delete-forever-outline"}
                                                size={30}
                                                color={Colors.EDITAR}
                                            />
                                        </TouchableOpacity>
                                    </ContainerRight>
                                </Row>
                            </ContainerItem>
                        )}
                        keyExtractor={(item: any) => item._id}
                        horizontal={false}
                        scrollEnabled={true}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}
            {modalDetalhes ? (
                <CenteredView>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalDetalhes}
                    >
                        <CenteredView>
                            <ModalView>
                                <ViewClose>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalDetalhes(!modalDetalhes);
                                            setEditar(false);
                                        }}
                                    >
                                        <Icon
                                            name={"close"}
                                            size={30}
                                            color={Colors.SECONDARY}
                                        />
                                    </TouchableOpacity>
                                </ViewClose>
                                <ContainerItem>
                                    <Row>
                                        <ContainerLeft>
                                            <Despesa>
                                                {buscaDespesa.item}
                                            </Despesa>
                                            <ContainerIndividual>
                                                <Data>
                                                    {moment(
                                                        buscaDespesa.date
                                                    ).format("DD/MM/YYYY")}
                                                </Data>
                                            </ContainerIndividual>
                                            <ContainerIndividual>
                                                <Valor>
                                                    {numberToReal(
                                                        parseInt(
                                                            buscaDespesa.value
                                                        )
                                                    )}
                                                </Valor>
                                            </ContainerIndividual>
                                        </ContainerLeft>
                                    </Row>
                                    <Row
                                        style={{
                                            justifyContent: "space-around",
                                        }}
                                    >
                                        <BtnDespesa
                                            onPress={() => {
                                                setModalDetalhes(
                                                    !modalDetalhes
                                                );
                                                setIdItem(buscaDespesa._id);
                                                setEditar(true);
                                                setModalVisible(true);
                                            }}
                                            style={{
                                                backgroundColor: Colors.EDITAR,
                                            }}
                                        >
                                            <TxtDespesa>Editar</TxtDespesa>
                                        </BtnDespesa>
                                        <BtnDespesa
                                            onPress={() =>
                                                DeletaDespesas(buscaDespesa._id)
                                            }
                                            style={{
                                                backgroundColor: Colors.DELETAR,
                                            }}
                                        >
                                            <TxtDespesa>Excluir</TxtDespesa>
                                        </BtnDespesa>
                                    </Row>
                                </ContainerItem>
                            </ModalView>
                        </CenteredView>
                    </Modal>
                </CenteredView>
            ) : (
                <CenteredView>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                    >
                        <CenteredView
                            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                            <ModalView>
                                <ViewClose>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            setEditar(false);
                                        }}
                                    >
                                        <Icon
                                            name={"close"}
                                            size={30}
                                            color={Colors.SECONDARY}
                                        />
                                    </TouchableOpacity>
                                </ViewClose>
                                <Label>Despesa:</Label>
                                <Input
                                    placeholder="Ex: Cartão de crédito"
                                    value={expense}
                                    onChangeText={setExpense}
                                    placeholderTextColor={"#b5a8b9c6"}
                                />

                                <Label style={{ marginTop: 25 }}>Valor:</Label>
                                <Input
                                    placeholder="R$ 00,00"
                                    value={value}
                                    keyboardType={"number-pad"}
                                    onChangeText={setValue}
                                    autoCapitalize={"none"}
                                    placeholderTextColor={"#b5a8b9c6"}
                                />
                                {editar ? (
                                    <BtnDespesa
                                        style={{
                                            backgroundColor: Colors.PRIMARY,
                                        }}
                                        onPress={() => {
                                            if (validar()) {
                                                handleEdit(activeEditItem);
                                                //EditarDespesas(idItem);
                                            }
                                        }}
                                    >
                                        <TxtDespesa>Editar</TxtDespesa>
                                    </BtnDespesa>
                                ) : (
                                    <BtnDespesa
                                        onPress={() => {
                                            if (validar()) {
                                                handleNew();
                                            }
                                        }}
                                    >
                                        <TxtDespesa>Criar</TxtDespesa>
                                    </BtnDespesa>
                                )}
                            </ModalView>
                        </CenteredView>
                    </Modal>
                </CenteredView>
            )}
            {items.length >= 2 && (
                <ClearListButton onPress={() => handleRemoveAll()}>
                    <ClearListButtonText>Limpar lista</ClearListButtonText>
                </ClearListButton>
            )}
        </Container>
    );
}
