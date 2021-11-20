import React, { useContext, useEffect, useState } from "react";
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
} from "./Home.styled";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from "../../styles";
import moment from "moment";
import StateContext from "../../context/States";
import {
    FlatList,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
} from "react-native";
import UserContext from "../../context/User";

export default function Home({ navigation }: any) {
    const {
        ListaDespesas,
        despesas,
        DeletaDespesas,
        item,
        setItem,
        value,
        setValue,
        CriarDespesas,
        modalVisible,
        setModalVisible,
        loadingDespesas,
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

    const { logout } = useContext(UserContext)

    useEffect(() => {
        ListaDespesas();
    }, []);

    function numberToReal(numero: any) {
        var numero = numero.toFixed(2).split(".");
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
        return numero.join(",");
    }

    const validar = () => {
        let error = false;

        if (item == "" || value == "") {
            alert("Preencha os campos corretamente.");
            error = true;
        }

        return !error;
    };

    if (loadingDespesas == true) {
        return (
            <ContainerLoading>
                <ActivityIndicator color={Colors.PRIMARY} size="large" />
            </ContainerLoading>
        );
    }

    return (
        <Container style={modalVisible ? { opacity: 0.5 } : { opacity: 1 }}>
            <TitlePage>Seja bem-vindo(a)!</TitlePage>
            <SubTitlePage>Veja aqui suas despesas:</SubTitlePage>
            {despesas.length == 0 ? (
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
                        style={{ marginTop: 20, marginBottom: 45 }}
                        data={despesas}
                        renderItem={({ item }: any) => (
                            <ContainerItem
                                onPress={() => {
                                    BuscaDespesa(item._id);
                                    setModalDetalhes(true);
                                }}
                            >
                                <Row>
                                    <ContainerLeft>
                                        <Despesa>{item.item}</Despesa>
                                        <ContainerIndividual>
                                            <Data>
                                                {moment(item.date).format(
                                                    "DD/MM/YYYY"
                                                )}
                                            </Data>
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
                                                setIdItem(item._id);
                                                setEditar(true);
                                                setModalVisible(true);
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
                                                DeletaDespesas(item._id)
                                            }
                                        >
                                            <Icon
                                                name={"delete-forever-outline"}
                                                size={30}
                                                color={Colors.DELETAR}
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
                                    <Row style={{justifyContent: 'space-around'}}>
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
                        <CenteredView>
                            <ModalView>
                                <ViewClose>
                                    <TouchableOpacity
                                        onPress={() => {
                                            setModalVisible(!modalVisible);
                                            setEditar(false);
                                        }}
                                    >
                                        <TxtCancelar>Cancelar</TxtCancelar>
                                    </TouchableOpacity>
                                </ViewClose>
                                <Label>Despesa:</Label>
                                <Input
                                    placeholder="Ex: Cartão de crédito"
                                    value={item}
                                    onChangeText={(text) => setItem(text)}
                                    autoCapitalize={"none"}
                                    placeholderTextColor={"#838282c8"}
                                />

                                <Label style={{ marginTop: 25 }}>Valor:</Label>
                                <Input
                                    placeholder="R$ 00,00"
                                    value={value}
                                    keyboardType={"number-pad"}
                                    onChangeText={(text) => setValue(text)}
                                    autoCapitalize={"none"}
                                    placeholderTextColor={"#838282c8"}
                                />
                                {editar ? (
                                    <BtnDespesa
                                        style={{
                                            backgroundColor: Colors.EDITAR,
                                        }}
                                        onPress={() => {
                                            if (validar()) {
                                                setEditar(false);
                                                EditarDespesas(idItem);
                                            }
                                        }}
                                    >
                                        <TxtDespesa>Editar</TxtDespesa>
                                    </BtnDespesa>
                                ) : (
                                    <BtnDespesa
                                        onPress={() => {
                                            if (validar()) {
                                                CriarDespesas();
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
            <BtnSair
                onPress={() => {
                    logout();
                    navigation.navigate("Login");
                }}
            >
                <Icon name="exit-run" size={38} color={Colors.WHITE} />
            </BtnSair>
        </Container>
    );
}
