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
    border-radius: 8px;
    background-color: ${Colors.PRIMARY};
    justify-content: center;
    align-items: center;
`;

export const TxtAdicionar = styled.Text`
    text-align: center;
    color: ${Colors.WHITE};
    font-size: 20px;
`;

export const ContainerItem = styled.View`
    width: 100%;
    height: auto;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 10px;
`;

export const Despesa = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${Colors.WHITE};
`;

export const Data = styled.Text`
    font-size: 16px;
    color: ${Colors.WHITE};
`;

export const Valor = styled.Text`
    font-size: 19px;
    font-weight: bold;
    color: ${Colors.WHITE};
    text-transform: uppercase;
`;

export const ContainerIndividual = styled.View`
    margin-top: 12px;
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

export const CenteredView = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const ModalView = styled.View`
    width: 90%;
    flex: 0.5;
    background-color: ${Colors.WHITE};
    align-items: center;
    border-radius: 8px;
    padding: 20px;
    position: absolute;
    top: 55;
`;

export const BtnDespesa = styled.TouchableOpacity`
    width: 85px;
    height: 35px;
    background-color: ${Colors.PRIMARY};
    justify-content: center;
    border-radius: 8px;
    margin-top: 40px;
`;

export const TxtDespesa = styled.Text`
    font-size: 20px;
    color: ${Colors.WHITE};
    text-align: center;
`;

export const ViewClose = styled.View`
    width: 100%;
    align-items: flex-end;
`;

export const TxtCancelar = styled.Text`
    font-size: 17px;
    color: ${Colors.DELETAR};
`;

export const Input = styled.TextInput`
    width: 95%;
    //height: 45px;
    padding: 12px;
    border-radius: 8px;
    background-color: ${Colors.GREY};
    color: ${Colors.WHITE};
`;

export const Label = styled.Text`
    width: 95%;
    padding: 10px;
    color: ${Colors.SECONDARY};
    font-size: 15px;
    font-weight: bold;
`;

export const ContainerLoading = styled.View`
    flex: 1;
    justify-content: center;
    background-color: ${Colors.SECONDARY};
`;

export const LabelDetalhes = styled.Text`
    color: ${Colors.SECONDARY};
    font-size: 15px;
    font-weight: bold;
`;

export const BtnSair = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    margin: 10px;
    width: 50px;
    height: 50px;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    justify-content: center;
    align-items: center;
`;

export const ClearListButton = styled.TouchableOpacity`
    width: 100%;
    height: 50px;
    border-radius: 8px;
    background-color: ${Colors.DELETAR};
    align-items: center;
    justify-content: center;
`;

export const ClearListButtonText = styled.Text`
    color: ${Colors.SECONDARY};
    font-size: 15px;
    font-weight: bold;
`;

export const ProfileButton = styled.TouchableOpacity`

`;

export const RevenueText = styled.Text`
    color: ${Colors.WHITE};
    font-size: 13px;
    font-weight: bold;
`;