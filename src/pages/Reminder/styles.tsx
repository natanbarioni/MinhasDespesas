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
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    color: ${Colors.WHITE};
`;
