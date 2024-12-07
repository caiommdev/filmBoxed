import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import ColourPalet from "../AppColours/ColourPalete";

export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <MaterialIcons name="movie" size={120} color={ColourPalet.highlight} />
                <Text style={styles.title}>Film Boxed</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.button}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.button, styles.buttonOutline]}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: ColourPalet.primary,
        padding: 20
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 60
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: ColourPalet.highlight,
        marginTop: 20
    },
    buttonContainer: {
        width: '100%',
        gap: 20
    },
    button: {
        backgroundColor: ColourPalet.highlight,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%'
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: ColourPalet.highlight
    },
    buttonText: {
        color: ColourPalet.text,
        fontSize: 18,
        fontWeight: 'bold'
    }
});