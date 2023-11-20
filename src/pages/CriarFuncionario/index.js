

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet  } from 'react-native';
import { API_ENDPOINT } from '../../config';

export default props =>{
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [tipoFuncionarioId, setTipoFuncionarioId] = useState('');
  const [setorId, setSetorId] = useState('');
  

  const criarFuncionario = async () => {
    try {
      const URL = API_ENDPOINT + 'Funcionarios/resumo';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nomeFuncionario: nome,
          usuario: usuario,
          senha: senha,
          tipoFuncionarioId: tipoFuncionarioId,
          setorId: setorId
        }),
      };

      const response = await fetch(URL, options);

      if (!response.ok) {
        throw new Error('Erro na solicitação HTTP');
      }

      const responseData = await response.json();

      Alert.alert(
        'Funcionário Criado!',
        'O funcionário foi adicionado com sucesso!',
        [
          {
            text: 'Ok',
            onPress: () => {
                props.navigation.navigate("ListarFuncionario");
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao criar funcionário: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o funcionário. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Nome:</Text>
      <TextInput
        value={nome}
        onChangeText={(text) => setNome(text)}
        placeholder="Digite o nome do funcionário"
      />
      <Text>Usuário:</Text>
      <TextInput
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
        placeholder="Digite o nome de usuário"
      />
      <Text>Senha:</Text>
      <TextInput
        value={senha}
        onChangeText={(text) => setSenha(text)}
        placeholder="Digite a senha do Funcionario"
      />
      <Text>Tipo Funcionario Id:</Text>
      <TextInput
        value={tipoFuncionarioId}
        onChangeText={(text) => setTipoFuncionarioId(text)}
        placeholder="Digite o Tipo de Funcionario"
      />
      <Text>Setor Id:</Text>
      <TextInput
        value={setorId}
        onChangeText={(text) => setSetorId(text)}
        placeholder="Digite o setor do funcionario"
      />
      <Button title="Criar Funcionário" onPress={criarFuncionario} />

      <Button
                style={styles.button}
                title="Logout"
                onPress={() => {
                    // dispatch({
                    //     type: 'loginUser',
                    //     payload: null
                    // })
                    props.navigation.push("Administrador");
                }}
            />
    </View>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#0EACBC',
        justifyContent: "flex-start",
        alignItems: "center",
        
    },
    containerButton:{
        
        backgroundColor: '#0EACBC',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    
    
    title:{
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
    text1:{
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
})