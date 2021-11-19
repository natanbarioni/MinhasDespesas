import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/router/Routes";
import { UserContextProvider } from "./src/context/User";
import { StateContextProvider } from "./src/context/States";

export default function App() {
    return (
        <UserContextProvider>
			<StateContextProvider>
				<NavigationContainer>
					<Routes />
				</NavigationContainer>
			</StateContextProvider>
        </UserContextProvider>
    );
}
