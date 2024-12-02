import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import ColourPalet from "../../AppColours/ColourPalete";

const AssessmentItem = ({ user, photo, rating, comment }) => {
    return (
        <View style={styles.assessmentItem}>
            <Image source={{ uri: photo }} style={styles.photo} />
            <View style={styles.details}>
                <Text style={styles.user}>{user}</Text>
                <Text style={styles.rating}>Nota: {rating}/10</Text>
                <Text style={styles.comment}>{comment}</Text>
            </View>
        </View>
    );
};

export default function Assessment({ assessments }) {
    if (!assessments || assessments.length === 0) {
        return <Text style={styles.noAssessments}>Nenhuma avaliação disponível</Text>;
    }

    return (
        <View style={styles.assessmentContainer}>
            {
                assessments.map((item, key)=> (
                    <AssessmentItem
                        key={key}
                        user={item.user}
                        photo={item.photo}
                        rating={item.rating}
                        comment={item.comment}
                    />
            ))
            }
        </View>
        );
}

const styles = StyleSheet.create({
    assessmentContainer: {
        padding: 10,
    },
    assessmentItem: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        backgroundColor: ColourPalet.secondary,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    photo: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    details: {
        flex: 1,
    },
    user: {
        fontSize: 16,
        fontWeight: 'bold',
        color: ColourPalet.textSecondary,
    },
    rating: {
        fontSize: 14,
        color: ColourPalet.highlight,
    },
    comment: {
        fontSize: 14,
        color: ColourPalet.textSecondary,
    },
    noAssessments: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
        color: ColourPalet.dim,
    },
});
