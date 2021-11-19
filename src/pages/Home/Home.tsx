import React, { useContext, useEffect } from "react";
import {
    BtnAdicionar,
    Container,
    ContainerVazio,
    SubTitlePage,
    TitlePage,
    TxtAdicionar,
    TxtVazio,
    BtnVer,
    ContainerIndividual,
    ContainerItem,
    ContainerLeft,
    ContainerRight,
    Data,
    Endereco,
    Nome,
    Placa,
    Row,
    TxtVer,
    Veiculo,
    Vistoriador,
} from "./Home.styled";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors } from "../../styles";
import moment from "moment";
import StateContext from "../../context/States";
import { FlatList, TouchableOpacity } from "react-native";

export default function Home({ navigation }: any) {
    const { ListaDespesas, despesas, DeletaDespesas } =
        useContext(StateContext);

    useEffect(() => {
        ListaDespesas();
    }, []);

    function numberToReal(numero: any) {
        var numero = numero.toFixed(2).split(".");
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join(".");
        return numero.join(",");
    }

    return (
        <Container>
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
                    <BtnAdicionar>
                        <TxtAdicionar>Criar despesa</TxtAdicionar>
                    </BtnAdicionar>
                </ContainerVazio>
            ) : (
                <FlatList
                    data={despesas}
                    renderItem={({ item }: any) => (
                        <ContainerItem>
                            <Row>
                                <ContainerLeft>
                                    <Placa>{item.item}</Placa>
                                    <ContainerIndividual>
                                        <Data>
                                            {moment(item.date).format(
                                                "DD/MM/YYYY"
                                            )}
                                        </Data>
                                    </ContainerIndividual>
                                    <ContainerIndividual>
                                        <Nome>
                                            {numberToReal(parseInt(item.value))}
                                        </Nome>
                                    </ContainerIndividual>
                                </ContainerLeft>
                                <ContainerRight>
                                    <TouchableOpacity
                                        onPress={() => DeletaDespesas(item._id)}
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
            )}
        </Container>
    );
}
