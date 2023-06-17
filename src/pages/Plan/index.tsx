import React, { useState, useEffect } from "react";

import {
    ButtonBack,
    ButtonSave,
    Container,
    ContainerBack,
    HorizontalLine,
    InputValue,
    Row,
    SimpleRow,
    TextButtonSave,
    Title,
} from "./styles";
import { Colors } from "../../styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import AsyncStorage, {
    useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export function Plan({ navigation }) {
    const [data, setData] = useState({});
    const [liquidPJ, setLiquidPJ] = useState("");
    const [liquidCLT, setLiquidCLT] = useState("");
    const [billsCLT, setBillsCLT] = useState("");
    const [livreCLT, setLivreCLT] = useState(0);
    const [investir50, setInvestir50] = useState(0);
    const [investir05, setInvestir05] = useState(0);
    const [investir20, setInvestir20] = useState(0);
    const [livreReal, setLivreReal] = useState(0);
    const [gastar05, setGastar05] = useState(0);
    const [gastar20, setGastar20] = useState(0);
    const [gastos05, setGastos05] = useState("");
    const [gastos20, setGastos20] = useState("");
    const { getItem, setItem } = useAsyncStorage("@myexpenses:plan");

    function formatMoney(value, setValue) {
        const formatedValue =
            "R$ " +
            value
                .toFixed(2)
                .replace(".", ",")
                .replace(/(\d)(?=(\d{3})+\,)/g, "$1.");
        setValue(formatedValue);
        return formatedValue;
    }

    useEffect(() => {
        // formatMoney(livreCLT, setLivreCLT);
        // formatMoney(investir50, setInvestir50);
        // formatMoney(investir05, setInvestir05);
        // formatMoney(investir20, setInvestir20);
        // formatMoney(livreReal, setLivreReal);
        // formatMoney(gastar05, setGastar05);
        // formatMoney(gastar20, setGastar20);
        // formatMoney(gastos05, setGastos05);
        // formatMoney(gastos20, setGastos20);
        calculate();
    }, [liquidCLT, billsCLT]);

    const formatedValue = (value) => {
        let valorSemFormatacao = value.replace("R$", "").replace(".", "");

        valorSemFormatacao = valorSemFormatacao.replace(",", ".");

        let valorEmNumerico = parseFloat(valorSemFormatacao);

        return valorEmNumerico;
    };

    const calculate = () => {
        //livre CLT
        const livreCLT =
            liquidCLT &&
            billsCLT &&
            formatedValue(liquidCLT) - formatedValue(billsCLT);
        formatMoney(liquidCLT && billsCLT ? livreCLT : 0, setLivreCLT);

        //investir 50% + sobra livre real
        const investir50 = liquidCLT && billsCLT && livreCLT * 0.5;
        formatMoney(liquidCLT && billsCLT ? investir50 : 0, setInvestir50);

        //Investir dia 05
        const investir05 = liquidCLT && billsCLT && investir50 * 0.6;
        formatMoney(liquidCLT && billsCLT ? investir05 : 0, setInvestir05);

        //Investir dia 20
        const investir20 = liquidCLT && billsCLT && investir50 * 0.4;
        formatMoney(liquidCLT && billsCLT ? investir20 : 0, setInvestir20);

        //Livre Real
        const livreReal = liquidCLT && billsCLT && livreCLT * 0.5;
        formatMoney(liquidCLT && billsCLT ? livreReal : 0, setLivreReal);

        //Gastar dia 05 até dia 20
        const gastar05 = liquidCLT && billsCLT && livreReal * 0.6;
        formatMoney(liquidCLT && billsCLT ? gastar05 : 0, setGastar05);

        //Gastar dia 20 até dia 05
        const gastar20 = liquidCLT && billsCLT && livreReal * 0.4;
        formatMoney(liquidCLT && billsCLT ? gastar20 : 0, setGastar20);
    };

    async function handleSave() {
        try {
            const newData = {
                liquidPJ,
                liquidCLT,
                billsCLT,
                livreCLT,
                investir50,
                investir05,
                investir20,
                livreReal,
                gastar05,
                gastar20,
                gastos05,
                gastos20,
            };

            const data = newData;

            await setItem(JSON.stringify(data));
            alert("Salvo com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Não foi possível salvar.");
        }
    }

    async function fetchData() {
        try {
            const data = await getItem();
            setData(JSON.parse(data));
        } catch (error) {
            console.log(error);

            Toast.show({
                type: "error",
                text1: "Não foi possível trazer os dados.",
            });
        }
    }

    useEffect(() => {
        fetchData();
        //AsyncStorage.removeItem("@myexpenses:plan")
    }, []);

    useEffect(() => {
        if (data) {
            setLiquidPJ(data.liquidPJ);
            setLiquidCLT(data.liquidCLT);
            setBillsCLT(data.billsCLT);
            setLivreCLT(data.livreCLT);
            setInvestir50(data.investir50);
            setInvestir05(data.investir05);
            setInvestir20(data.investir20);
            setLivreReal(data.livreReal);
            setGastar05(data.gastar05);
            setGastar20(data.gastar20);
            setGastos05(data.gastos05);
            setGastos20(data.gastos20);
        }
    }, [data]);

    console.log(data);

    return (
        <ScrollView>
            <Container>
                <Row>
                    <ContainerBack>
                        <ButtonBack onPress={() => navigation.goBack()}>
                            <MaterialIcons
                                name="arrow-back-ios"
                                size={30}
                                color={Colors.WHITE}
                            />
                        </ButtonBack>
                    </ContainerBack>
                    <Title>Plano mensal</Title>
                </Row>
                <SimpleRow style={{ marginTop: 70 }}>
                    <Title>Liquido PJ:</Title>
                    <TextInputMask
                        type={"money"}
                        style={{
                            width: "50%",
                            padding: 15,
                            borderRadius: 8,
                            backgroundColor: Colors.GREY,
                            color: Colors.WHITE,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        placeholder="R$ 00,00"
                        value={liquidPJ}
                        onChangeText={(value) => {
                            setLiquidPJ(value);
                        }}
                        autoCapitalize={"none"}
                        placeholderTextColor={"#b5a8b9c6"}
                    />
                </SimpleRow>
                <SimpleRow>
                    <Title>Liquido CLT:</Title>
                    <TextInputMask
                        type={"money"}
                        style={{
                            width: "50%",
                            padding: 15,
                            borderRadius: 8,
                            backgroundColor: Colors.GREY,
                            color: Colors.WHITE,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        placeholder="R$ 00,00"
                        value={liquidCLT}
                        onChangeText={(value) => {
                            setLiquidCLT(value);
                        }}
                        autoCapitalize={"none"}
                        placeholderTextColor={"#b5a8b9c6"}
                    />
                </SimpleRow>
                <SimpleRow>
                    <Title>Contas CLT:</Title>
                    <TextInputMask
                        type={"money"}
                        style={{
                            width: "50%",
                            padding: 15,
                            borderRadius: 8,
                            backgroundColor: Colors.GREY,
                            color: Colors.WHITE,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        placeholder="R$ 00,00"
                        value={billsCLT}
                        onChangeText={(value) => {
                            setBillsCLT(value);
                        }}
                        autoCapitalize={"none"}
                        placeholderTextColor={"#b5a8b9c6"}
                    />
                </SimpleRow>
                <HorizontalLine />
                <SimpleRow>
                    <Title>Livre CLT: </Title>
                    <Title style={{ color: "#388cdb" }}>{livreCLT}</Title>
                </SimpleRow>

                <HorizontalLine />

                <SimpleRow>
                    <Title>Investir 50% + Sobra Livre Real: </Title>
                    <Title style={{ color: "#35d673" }}>{investir50}</Title>
                </SimpleRow>
                <SimpleRow>
                    <Title>Investir dia 05: </Title>
                    <Title style={{ color: "#35d673" }}>{investir05}</Title>
                </SimpleRow>
                <SimpleRow>
                    <Title>Investir dia 20: </Title>
                    <Title style={{ color: "#35d673" }}>{investir20}</Title>
                </SimpleRow>
                <HorizontalLine />
                <SimpleRow>
                    <Title>Livre Real: </Title>
                    <Title style={{ color: "#ffa551" }}>{livreReal}</Title>
                </SimpleRow>
                <SimpleRow>
                    <Title>Gastar dia 05 até dia 20: </Title>
                    <Title style={{ color: "#ffa551" }}>{gastar05}</Title>
                </SimpleRow>
                <SimpleRow>
                    <Title>Gastar dia 20 até dia 05: </Title>
                    <Title style={{ color: "#ffa551" }}>{gastar20}</Title>
                </SimpleRow>
                <HorizontalLine />
                <SimpleRow>
                    <Title>Gastos dia 05 até dia 20: </Title>
                    <TextInputMask
                        type={"money"}
                        style={{
                            width: "40%",
                            padding: 15,
                            borderRadius: 8,
                            backgroundColor: Colors.GREY,
                            color: Colors.WHITE,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        placeholder="R$ 00,00"
                        value={gastos05}
                        onChangeText={(value) => {
                            setGastos05(value);
                        }}
                        autoCapitalize={"none"}
                        placeholderTextColor={"#b5a8b9c6"}
                    />
                </SimpleRow>
                <SimpleRow>
                    <Title>Gastos dia 20 até dia 05: </Title>
                    <TextInputMask
                        type={"money"}
                        style={{
                            width: "40%",
                            padding: 15,
                            borderRadius: 8,
                            backgroundColor: Colors.GREY,
                            color: Colors.WHITE,
                            fontSize: 16,
                            fontWeight: "bold",
                        }}
                        placeholder="R$ 00,00"
                        value={gastos20}
                        onChangeText={(value) => {
                            setGastos20(value);
                        }}
                        autoCapitalize={"none"}
                        placeholderTextColor={"#b5a8b9c6"}
                    />
                </SimpleRow>

                <ButtonSave onPress={() => handleSave()}>
                    <TextButtonSave>Salvar</TextButtonSave>
                </ButtonSave>
            </Container>
        </ScrollView>
    );
}
