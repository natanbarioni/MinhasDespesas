import React, { useState } from "react";

import { View, Button, Text, TouchableOpacity } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import {
    ButtonBack,
    ButtonSave,
    Container,
    ContainerBack,
    InputDateTime,
    Row,
    TextButtonSave,
    TextDateTime,
    Title,
} from "./styles";
import { Colors } from "../../styles";

export function Reminder({ navigation }: any) {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState("");
    const [timeValue, setTimeValue] = useState("");

    const horaAtual = date.toLocaleTimeString("pt-BR", {
        hour12: false,
        minute: "2-digit",
        hour: "2-digit",
        second: "omit",
    });

    function horaAtualFormatada(date?: string) {
        var data = date || new Date();
        const horas = data.getHours();
        const minutos = data.getMinutes();
        const horaAtual = `${horas.toString().padStart(2, "0")}:${minutos
            .toString()
            .padStart(2, "0")}`;
        return horaAtual;
    }

    function dataAtualFormatada(date?: string) {
        var data = date || new Date(),
            dia = data.getDate().toString(),
            diaF = dia.length == 1 ? "0" + dia : dia,
            mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
            mesF = mes.length == 1 ? "0" + mes : mes,
            anoF = data.getFullYear();
        return diaF + "/" + mesF + "/" + anoF;
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setDateValue(dataAtualFormatada(currentDate));
        setTimeValue(horaAtualFormatada(currentDate));
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode("date");
    };

    const showTimepicker = () => {
        showMode("time");
    };

    return (
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
                <Title>Agende um lembrete</Title>
            </Row>

            <InputDateTime onPress={showDatepicker}>
                <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color={Colors.WHITE}
                />
                <TextDateTime
                    style={{
                        color: !dateValue ? "#d8d8d8" : "white",
                        marginLeft: 10,
                    }}
                >
                    {dateValue || dataAtualFormatada()}
                </TextDateTime>
            </InputDateTime>

            <InputDateTime onPress={showTimepicker} style={{ marginTop: 20 }}>
                <MaterialIcons
                    name="calendar-today"
                    size={20}
                    color={Colors.WHITE}
                />
                <TextDateTime
                    style={{
                        color: !timeValue ? "#d8d8d8" : "white",
                        marginLeft: 10,
                    }}
                >
                    {timeValue || horaAtualFormatada()}
                </TextDateTime>
            </InputDateTime>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    onChange={onChange}
                />
            )}

            <ButtonSave onPress={() => navigation.goBack()}>
                <TextButtonSave>Salvar</TextButtonSave>
            </ButtonSave>
        </Container>
    );
}
