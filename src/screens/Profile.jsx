import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';
import ColourPalet from "../AppColours/ColourPalete";
import UserService from '../services/UserService';

export default function Profile() {
    const route = useRoute();
    const { username, email } = route.params;
    const [image, setImage] = useState(null);

    useEffect(() => {
        const fetchUserImage = async () => {
            const user = await UserService.getUser(email);
            if (user && user.image) {
                setImage(user.image);
            }
        };
        fetchUserImage();
    }, [email]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result.assets[0].uri);
        if (!result.cancelled) {
            setImage(result.assets[0].uri);
            await UserService.updateUser(email, { image: result.assets[0].uri });
        }
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.cancelled) {
            setImage(result.uri);
            await UserService.updateUser(email, { image: result.uri });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>User Profile</Text>
            {image && <Image source={{ uri: image }} style={styles.profileImage} />}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
                <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
                <Text style={styles.buttonText}>Take Photo</Text>
            </TouchableOpacity>
            <View style={styles.userInfo}>
                <Text style={styles.infoText}>Username: {username}</Text>
                <Text style={styles.infoText}>Email: {email}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: ColourPalet.primary,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: ColourPalet.highlight,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    button: {
        backgroundColor: ColourPalet.highlight,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 10,
        width: '80%',
    },
    buttonText: {
        color: ColourPalet.text,
        fontSize: 18,
        fontWeight: 'bold',
    },
    userInfo: {
        marginTop: 20,
        alignItems: 'center',
    },
    infoText: {
        fontSize: 16,
        marginVertical: 5,
        color: ColourPalet.text,
    },
});