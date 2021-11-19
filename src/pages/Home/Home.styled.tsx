import styled from "styled-components/native";
import { Colors } from "../../styles";

export const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${Colors.SECONDARY};
    padding: 20px;
`;

export const TitlePage = styled.Text`
    margin-top: 20px;
    text-align: center;
    color: ${Colors.WHITE};
    font-weight: bold;
    font-size: 25px;
`;

export const SubTitlePage = styled.Text`
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: center;
    color: ${Colors.WHITE};
    font-weight: bold;
    font-size: 15px;
`;

export const ContainerVazio = styled.View`
    flex: 0.7;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

export const TxtVazio = styled.Text`
    margin-top: 20px;
    text-align: center;
    color: ${Colors.GREY_LIGHT};
    font-weight: bold;
    font-size: 22px;
`;

export const BtnAdicionar = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    padding: 5px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: ${Colors.PRIMARY};
    justify-content: center;
`;

export const TxtAdicionar = styled.Text`
    text-align: center;
    color: ${Colors.WHITE};
    font-size: 20px;
`;

export const ContainerItem = styled.Pressable`
    width: 100%;
    height: auto;
    background-color: ${Colors.WHITE};
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 10px;
`;

export const Placa = styled.Text`
    font-size: 32px;
    color: black;
`;

export const Data = styled.Text`
    font-size: 18px;
    color: black;
`;

export const Nome = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: black;
    text-transform: uppercase;
`;

export const Endereco = styled.Text`
    font-size: 17px;
    color: black;
    width: 100%;
`;

export const ContainerIndividual = styled.View`
    margin-top: 12px;
`;

export const Veiculo = styled.Text`
    font-size: 18px;
    color: black;
    width: 100%;
`;

export const Vistoriador = styled.Text`
    font-size: 17px;
    color: ${Colors.WHITE};
    width: 100%;
    background-color: ${Colors.PRIMARY};
    border-radius: 40px;
    padding-top: 3px;
    padding-bottom: 3px;
    padding-left: 12px;
    padding-right: 12px;
`;

export const Row = styled.View`
    flex-direction: row;
`;

export const ContainerLeft = styled.View`
    width: 70%;
`;
export const ContainerRight = styled.View`
    width: 30%;
    align-items: center;
    justify-content: center;
`;

export const BtnVer = styled.TouchableOpacity`
    width: 100px;
    height: 40px;
    border-width: 0.5px;
    border-color: ${Colors.PRIMARY};
    justify-content: center;
    border-radius: 2px;
`;

export const TxtVer = styled.Text`
    font-size: 20px;
    color: ${Colors.PRIMARY};
    text-align: center;
`;
