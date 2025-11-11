import React from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ProviderPicker({ providers = [], selected, onSelect }) {
  const items = [
    { id: '', name: 'Seleccione el Proveedor' }, // ítem 0
    ...providers,
  ];  
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Fecha de entrega</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selected?.id ?? ''}
          onValueChange={id => {
            const provider = items.find(p => p.id === id);
            if (provider) onSelect(provider);
          }}
          style={styles.picker}
          >
          {items.map(p => (
            <Picker.Item key={p.id} label={p.name} value={p.id} />
          ))}
        </Picker>      
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 4 },
  label: { fontWeight: '600', marginBottom: 4 },
      pickerContainer: {
        borderRadius: 5,
        overflow: 'hidden', // Important for applying borderRadius to the picker itself
        marginVertical: 2,
      },  
  picker: { backgroundColor: '#fff', borderRadius: 6, paddingVertical: 10, paddingHorizontal: 12, borderWidth: 1, borderColor: '#ccc' },
});