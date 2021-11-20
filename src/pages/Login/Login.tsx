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
} from "react-native";
import UserContext from "../../context/User";
import { Colors } from "../../styles";

export default function Login({ navigation }: any) {
    const { Start } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const validar = () => {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let error = false;
        setErrorEmail("");

        if (!re.test(String(email).toLowerCase())) {
            alert("Preencha o campo corretamente.")
            error = true;
        }
        return !error;
    };

    function Logar() {
        setLoading(true);
        Start(email).then((resposta: boolean) => {
            if (resposta) {
                navigation.navigate("Home");
                setLoading(false);
            }
        });
    }
    if (loading == true) {
        return (
            <ContainerLoading>
                <TxtLoading1>Entrando...</TxtLoading1>
                <ActivityIndicator color={Colors.PRIMARY} size="large" />
            </ContainerLoading>
        );
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Container>
                <Logo
                    source={{
                        uri: "https://www.sofit4.com.br/wp-content/uploads/sofit-logo-130621a.png",
                    }}
                />
                <Label>Email</Label>
                <Input
                    placeholder="exemplo@exemplo.com"
                    value={email}
                    keyboardType={"email-address"}
                    onChangeText={setEmail}
                    autoCapitalize={"none"}
                    placeholderTextColor={'#838282c8'}
                />
                <BtnAcessar
                    onPress={() => {
                        if (validar()) {
                            Logar();
                        }
                    }}
                >
                    <TxtAcessar>Acessar</TxtAcessar>
                </BtnAcessar>
            </Container>
        </TouchableWithoutFeedback>
    );
}
