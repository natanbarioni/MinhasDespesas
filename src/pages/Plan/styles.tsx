import styled from "styled-components/native";
import { Colors } from "../../styles";

export const Container = styled.View`
    width: 100%;
    height: 100%;
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

export const SubTitle = styled.Text`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: ${Colors.WHITE};
`;

export const InputValue = styled.TextInput`
    width: 50%;
    padding: 15px;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    align-items: center;
    flex-direction: row;
    color: white;
    font-size: 16px;
    font-weight: bold;
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

export const SimpleRow = styled.View`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
`;

export const ButtonSave = styled.TouchableOpacity`
    width: 100%;
    padding: 16px;
    background-color: ${Colors.PRIMARY};
    border-radius: 8px;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;

export const TextButtonSave = styled.Text`
    font-size: 18px;
    color: ${Colors.WHITE};
    font-weight: bold;
`;

export const HorizontalLine = styled.View`
    width: 100%;
    height: 1.5px;
    background-color: ${Colors.PRIMARY};
    margin: 5px 0px;
`;
