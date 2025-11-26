import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

export default function IconButton({
    iconName,
    title,
    onPress,
    color = 'white',
    backgroundColor = '#cecece',
}) {

    return (
        <TouchableOpacity style={[styles.button, { backgroundColor: backgroundColor }]} onPress={onPress}>
            <Icon name={iconName} size={20} color={color} /> 
            {title ? <Text style={[styles.buttonText, { color: color}]}>{title}</Text> : null}
        </TouchableOpacity>        
    );
    
}

const styles = StyleSheet.create({
      button: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 6,
        borderRadius: 5,
      },
      buttonText: {
        marginLeft: 8,
        marginRight: 8,
        fontWeight: '600',
        fontSize: 14,
        fontFamily: 'Nunito-Medium',
      },    
});