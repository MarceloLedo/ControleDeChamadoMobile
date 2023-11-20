import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import React, { useState } from 'react';
import { API_ENDPOINT } from '../../config';

export default props =>{
  const [nome, setNome] = useState('');
  const [funcao, setFuncao] = useState('');
  const [ramal, setRamal] = useState('');
  
  const criarSetor = async () => {
    try {
      const URL = API_ENDPOINT + 'Setores';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: nome,
          funcao: funcao,
          ramal: ramal,
          
        }),
      };

      const response = await fetch(URL, options);

      if (!response.ok) {
        throw new Error('Erro na solicitação HTTP');
      }

      const responseData = await response.json();

      Alert.alert(
        'Setor Criado!',
        'O Setor foi adicionado com sucesso!',
        [
          {
            text: 'Ok',
            onPress: () => {
                props.navigation.navigate("ListarSetor");
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao criar Setor: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o Setor. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Setor</Text>
      <Text style={styles.text1}>Nome</Text>
      <TextInput
      style={styles.text2}
        value={nome}
        onChangeText={(text) => setNome(text)}
        placeholder="Digite o nome do Setor"
      />
      <Text style={styles.text1}>Função</Text>
      <TextInput
      style={styles.text2}
        value={funcao}
        onChangeText={(text) => setFuncao(text)}
        placeholder="Digite a função do Setor"
      />
      <Text style={styles.text1}>Ramal</Text>
      <TextInput
      style={styles.text2}
        value={ramal}
        onChangeText={(text) => setRamal(text)}
        placeholder="Digite o ramal"
      />
      
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={criarSetor}>
          <Text style={styles.buttonText}>CRIAR SETOR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
          <Text style={styles.buttonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>  

    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#0EACBC',
      
  },
  containerButton:{
      
      backgroundColor: '#0EACBC',
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
  },
  title:{
    color: 'white',
      fontSize: 24,
      fontWeight: 'bold',
      marginTop: 28,
      marginBottom: 12,
  },
  text:{
      color: '#000000',
      fontSize: 12,
  },
  button:{
      backgroundColor: '#A5E899',
      borderRadius: 10,
      paddingVertical: 10,
      width: '40%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 20
  },
  buttonText:{
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',

  },
  text6:{
      backgroundColor: '#fff',
      color: '#000000',
      fontSize: 16,
      padding:13,
      borderRadius: 10,
      marginTop:8
  },
  button1:{
      borderRadius: 10,
      paddingVertical: 10,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      padding: 15,
  },
  text2:{
    backgroundColor: '#fff',
    color: '#000000',
    fontSize: 14,
    padding:5,
    borderRadius: 10,
    marginTop:5,
    marginLeft:4
  },
  text1:{
      color: '#000000',
      fontSize: 14,
      padding:5,
      borderRadius: 10,
      marginTop:5,
      marginLeft:4
  },
})