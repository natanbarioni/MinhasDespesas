import styled from "styled-components/native";
import { Colors } from "../../styles";

export const Container = styled.View`
    flex: 1;
    width: 100%;
    background-color: ${Colors.SECONDARY};
    align-items: center;
    justify-content: center;
    padding: 20px;
`;

export const Title = styled.Text`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    color: ${Colors.WHITE};
`;

export const ContainerBack = styled.View`
    position: absolute;
    width: 100%;
`;

export const ButtonBack = styled.TouchableOpacity`
    width: 50px;
    align-items: center;
`;

export const Row = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 20px;
`;

export const InputDateTime = styled.TouchableOpacity`
    width: 85%;
    padding: 15px;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    align-items: center;
    flex-direction: row;
`;

export const TextDateTime = styled.Text`
    font-size: 16px;
    color: ${Colors.WHITE};
`;

export const ButtonSave = styled.TouchableOpacity`
    width: 50%;
    padding: 10px;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-top: 30px;
`;

export const TextButtonSave = styled.Text`
    font-size: 16px;
    color: ${Colors.WHITE};
    font-weight: bold;
`;
