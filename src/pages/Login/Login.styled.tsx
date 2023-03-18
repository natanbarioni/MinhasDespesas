import styled from "styled-components/native";
import { Colors } from "../../styles";

export const Container = styled.SafeAreaView`
    flex: 1;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.SECONDARY};
`;

export const Logo = styled.Image`
    width: 130;
    height: 70;
    margin-bottom: 30px;
`;

export const Input = styled.TextInput`
    width: 70%;
    height: 50px;
    padding: 10px;
    border-radius: 8px;
    background-color: ${Colors.GREY};
    color: ${Colors.WHITE};
`;

export const Label = styled.Text`
    width: 70%;
    padding: 10px;
    color: ${Colors.WHITE};
    font-size: 18px;
    font-weight: bold;
`;

export const BtnAcessar = styled.TouchableOpacity`
    width: 70%;
    height: 50px;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    justify-content: center;
    margin-top: 10px;
`;

export const TxtAcessar = styled.Text`
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 17px;
`;

export const ErrorMessage = styled.Text`
    color: red;
    font-weight: bold;
    font-size: 15px;
`;

export const ContainerLoading = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${Colors.SECONDARY};
`;

export const TxtLoading1 = styled.Text`
    font-size: 20;
    text-align: center;
    font-weight: bold;
    margin-bottom: 10;
    color: ${Colors.WHITE}
`;

export const TxtLoading2 = styled.Text`
    font-size: 17;
    text-align: center;
    margin-bottom: 10;
`;


