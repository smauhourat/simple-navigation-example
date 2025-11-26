import { View, Text, StyleSheet } from "react-native";

export default function OrderItem({ item }) {
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View>
                    <Text style={{ paddingTop: 0, fontWeight: '600', fontFamily: 'Nunito-Bold' }}>{item.producto_nombre} - {item.cantidad} {item.producto_unidad_medida}</Text>
                    <Text style={{ paddingTop: 0, textTransform: 'lowercase', fontFamily: 'Nunito-Medium' }}>{item.producto_descripcion} - PU: ${item.precio_unitario.toFixed(2)}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <Text style={{ paddingTop: 0, color: 'green', fontWeight: '500', fontFamily: 'Nunito-Bold' }}>${item.subtotal.toFixed(2)}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 8,
        padding: 15,
        borderRadius: 4,
        elevation: 2,
        backgroundColor: "#fcfcfc",
        borderColor: "#ddd",
        borderWidth: 1,
        shadowColor: "#2c2b2bff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 1.41,         
    },  
});