import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Login/Login";
import Home from "../pages/Home/Home";
import { MyData } from "../pages/MyData/MyData";
import { Reminder } from "../pages/Reminder";
import { Plan } from "../pages/Plan";

export default function Routes() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MyData" component={MyData} />
            <Stack.Screen name="Reminder" component={Reminder} />
            <Stack.Screen name="Plan" component={Plan} />
        </Stack.Navigator>
    );
}
