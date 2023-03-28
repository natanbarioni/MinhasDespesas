import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes/Routes";
import { UserContextProvider } from "./src/context/User";
import { StateContextProvider } from "./src/context/States";
import { StatusBar, View } from "react-native";
import { Colors } from "./src/styles";

export default function App() {
    return (
        <UserContextProvider>
            <StateContextProvider>
                <NavigationContainer>
                    <StatusBar barStyle={"light-content"} />
                    <View
                        style={{
                            flex: 1,
                            width: "100%",
                            backgroundColor: Colors.SECONDARY,
                        }}
                    >
                        <Routes />
                    </View>
                </NavigationContainer>
            </StateContextProvider>
        </UserContextProvider>
    );
}
