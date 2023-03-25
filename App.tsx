import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/Routes";
import { UserContextProvider } from "./src/context/User";
import { StateContextProvider } from "./src/context/States";
import { StatusBar } from "react-native";

export default function App() {
    return (
        <UserContextProvider>
			<StateContextProvider>
				<NavigationContainer>
					<StatusBar barStyle={"light-content"}/>
					<Routes />
				</NavigationContainer>
			</StateContextProvider>
        </UserContextProvider>
    );
}
