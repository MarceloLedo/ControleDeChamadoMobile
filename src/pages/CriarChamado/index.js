import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import { useState} from "react";
import { API_ENDPOINT } from "../../config";

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
      <Text style={styles.title}> Criar Chamado</Text>
      <Text style={styles.text1}>Título:</Text>
      <TextInput
      style={styles.text2}
        value={titulo}
        onChangeText={(text) => setTitulo(text)}
        placeholder="Digite o titulo do Chamado..."
      />
      <Text style={styles.text1}>Descrição:</Text>
      <TextInput
      style={styles.text2}
        value={descricao}
        onChangeText={(text) => setDescricao(text)}
        placeholder="Digite a descrição..."
      />
      <Text style={styles.text1}>Status:</Text>
      <TextInput
      style={styles.text2}
        value={status}
        onChangeText={(text) => setStatus(text)}
        placeholder="Digite o status..."
      />
       <Text style={styles.text1}>Prioridade:</Text>
      <TextInput
      style={styles.text2}
        value={prioridade}
        onChangeText={(text) => setPrioridade(text)}
        placeholder="Digite a prioridade..."
      />
       <Text style={styles.text1}>classificacaoId:</Text>
      <TextInput
      style={styles.text2}
        value={classificacaoId}
        onChangeText={(text) => setClassificacaoId(text)}
        placeholder="Digite a classificacao id..."
      />
       <Text style={styles.text1}>solicitanteId:</Text>
      <TextInput
        style={styles.text2}
        value={solicitanteId}
        onChangeText={(text) => setSolicitanteId(text)}
        placeholder="Digite o solicitante id..."
      />
      
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.button} onPress={criarChamado}>
          <Text style={styles.buttonText}>CONFIRMAR</Text>
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
