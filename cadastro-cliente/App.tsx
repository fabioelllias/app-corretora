import React, { useState } from 'react';
import {
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import { MaskedTextInput } from 'react-native-mask-text';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const enviarKit = async () => {
    setLoading(true);

    try {
      await axios.post('http://192.168.0.220:5210/api/cliente', {
        cpf,
        email,
      });

      Alert.alert('Sucesso', 'E-mail de boas-vindas enviado com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível enviar o kit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Cliente</Text>
      <Text style={styles.subtitle}>
        Cadastre os dados do cliente para enviar o kit de boas-vindas
      </Text>

      <MaskedTextInput
        mask="999.999.999-99"
        placeholder="000.000.000-00"
        style={styles.input}
        value={cpf}
        onChangeText={(text, rawText) => setCpf(rawText)}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="cliente@email.com"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoText}>
          O cliente receberá um e-mail com o kit de boas-vindas, link para download do APP e código de primeiro acesso.
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={enviarKit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Enviar Kit de Boas-vindas</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 80 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#2e7d32', marginBottom: 10 },
  subtitle: { fontSize: 14, marginBottom: 20, color: '#555' },
  input: {
    borderWidth: 1,
    borderColor: '#a5d6a7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#e8f5e9'
  },
  infoBox: {
    backgroundColor: '#c8e6c9',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20
  },
  infoText: { fontSize: 13, color: '#1b5e20' },
  button: {
    backgroundColor: '#43a047',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonDisabled: {
    backgroundColor: '#81c784'
  },
  buttonText: { color: '#fff', fontWeight: 'bold' }
});
