import React from 'react';
import { View, ScrollView, Button } from 'react-native';
import QRCode from "react-qr-code";

const QRScreen = (props) => {
    return (
        <ScrollView>
            <QRCode value="CodigoQR" size='300'/>
            <View style={{ padding: 5 }}>
                <Button title="Volver"
                    onPress={() => props.navigation.navigate('ApoinmentList')} />
            </View>
        </ScrollView>
    );
};

export default QRScreen