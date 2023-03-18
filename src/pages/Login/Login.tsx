import React, { useContext, useState } from "react";
import {
    Container,
    Input,
    BtnAcessar,
    TxtAcessar,
    ErrorMessage,
    ContainerLoading,
    TxtLoading1,
    Label,
    Logo,
} from "./Login.styled";

import {
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
    Image,
} from "react-native";
import UserContext from "../../context/User";
import { Colors } from "../../styles";
import * as LocalAuthentication from "expo-local-authentication";
import Toast from "react-native-toast-message";

export default function Login({ navigation }: any) {
    function login() {
        LocalAuthentication.getEnrolledLevelAsync().then((support) => {
            console.log("support ", support);
            if (support === 0) {
                Toast.show({
                    type: "success",
                    text1: "Bem-vindo(a)!",
                    text2: "Se possível, habilite a autenticação, é mais seguro.",
                });
                navigation.navigate("Home");
                return;
            }
            LocalAuthentication.authenticateAsync().then((auth) => {
                console.log(auth);
                if (auth.success === true) {
                    Toast.show({
                        type: "success",
                        text1: "Login efetuado com sucesso!",
                    });
                    navigation.navigate("Home");
                }
                if (auth.success === false) {
                    Toast.show({
                        type: "error",
                        text1: "Não foi possível efetuar o login.",
                    });
                }
            });
        });
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container>
                <Image
                    source={require("../../assets/logo.png")}
                    style={{ width: 250, height: 250 }}
                />
                <BtnAcessar
                    onPress={() => {
                        login();
                    }}
                >
                    <TxtAcessar>Acessar</TxtAcessar>
                </BtnAcessar>
            </Container>
        </TouchableWithoutFeedback>
    );
}
