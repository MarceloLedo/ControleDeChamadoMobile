
import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet  } from 'react-native';
import { API_ENDPOINT } from '../../config';

export default props =>{
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [classificacaoId, setClassificacaoId] = useState('');
  const [solicitanteId, setSolicitanteId] = useState('');

  
  

  const criarChamado = async () => {
    try {
      const URL = API_ENDPOINT + 'Chamados/Resumo';
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: titulo,
          descricao: descricao,
          status: status,
          prioridade: prioridade,
          classificacaoId: classificacaoId,
          solicitanteId: solicitanteId,
        
        }),
      };

      const response = await fetch(URL, options);

      if (!response.ok) {
        throw new Error('Erro na solicitação HTTP');
      }

      const responseData = await response.json();

      Alert.alert(
        'Chamado Criado!',
        'O Chamado foi adicionado com sucesso!',
        [
          {
            text: 'Ok',
            onPress: () => {
                props.navigation.navigate("Solicitante");
            },
          },
        ]
      );
    } catch (error) {
      console.error('Erro ao criar Chamado: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao criar o Chamado. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Título:</Text>
      <TextInput
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
        placeholder="Digite o titulo do Chamado"
      />
      <Text>Descrição:</Text>
      <TextInput
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
        placeholder="Digite a descrição "
      />
      <Text>Status:</Text>
      <TextInput
        value={status}
        onChangeText={(text) => setStatus(text)}
        placeholder="Digite o status  "
      />
       <Text>Prioridade:</Text>
      <TextInput
        value={prioridade}
        onChangeText={(text) => setPrioridade(text)}
        placeholder="Digite a prioridade"
      />
       <Text>classificacaoId:</Text>
      <TextInput
        value={classificacaoId}
        onChangeText={(text) => setClassificacaoId(text)}
        placeholder="Digite o ramal"
      />
       <Text>solicitanteId:</Text>
      <TextInput
        value={solicitanteId}
        onChangeText={(text) => setSolicitanteId(text)}
        placeholder="Digite o ramal"
      />
      
      <Button style={styles.button} title="Criar Chamado" onPress={criarChamado} />

      <Button
                style={styles.button}
                title="Logout"
                onPress={() => {
                    // dispatch({
                    //     type: 'loginUser',
                    //     payload: null
                    // })
                    props.navigation.push("SignIn");
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
