import React, { useEffect, useRef, useState } from "react";

import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
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
import { Platform } from "react-native";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export function Reminder({ navigation }: any) {
    const [date, setDate] = useState(new Date());
    const [dateAtual, setDataAtual] = useState(new Date());
    const [mode, setMode] = useState("date");
    const [show, setShow] = useState(false);
    const [dateValue, setDateValue] = useState("");
    const [timeValue, setTimeValue] = useState("");
    const [expoPushToken, setExpoPushToken] = useState("");
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then((token) =>
            setExpoPushToken(token)
        );

        notificationListener.current =
            Notifications.addNotificationReceivedListener((notification) => {
                setNotification(notification);
            });

        responseListener.current =
            Notifications.addNotificationResponseReceivedListener(
                (response) => {
                    console.log(response);
                }
            );

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current
            );
            Notifications.removeNotificationSubscription(
                responseListener.current
            );
        };
    }, []);

    // useEffect(() => {
    //     setInterval(function () {
    //         const dataAtual = new Date();
    //         setDataAtual(dataAtual);
    //     }, 60000);
    // }, []);

    console.log(
        Math.floor(date.getTime() / 1000) -
            Math.floor(dateAtual.getTime() / 1000)
    );
    // const agora = new Date();
    // const amanha = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() + 0, 1, 44, 10);
    // const diferencaEmMilissegundos = amanha.getTime() - agora.getTime();
    // const diferencaEmSegundos = Math.round(diferencaEmMilissegundos / 1000);

    async function schedulePushNotification() {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Minhas Despesas",
                body: "Lembre de pagar as suas contas!",
                // data: { data: "goes here" },
                vibrate: [10],
                priority: Notifications.AndroidNotificationPriority.MAX,
            },
            trigger: {
                seconds:
                    Math.floor(date.getTime() / 1000) -
                    Math.floor(dateAtual.getTime() / 1000),
            },
        });
    }

    //console.log(diferencaEmSegundos);

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === "android") {
            await Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                alert("Failed to get push token for push notification!");
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        return token;
    }

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
        const dataAtual = new Date();
        setDataAtual(dataAtual);
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

            <ButtonSave
                onPress={async () => {
                    await schedulePushNotification();
                }}
            >
                <TextButtonSave>Salvar</TextButtonSave>
            </ButtonSave>
        </Container>
    );
}
