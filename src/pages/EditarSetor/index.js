import { useRoute } from '@react-navigation/native';
import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import { API_ENDPOINT } from "../../config";
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';





export default props =>{
    const route = useRoute();
    const { setorId } = route.params;
    const { nome } = route.params;
    const { funcao  } = route.params;
    const { ramal } = route.params;
    const { status } = route.params;
    
    const initialIdSetor = setorId ;
    const initialNome = nome ;
    const initialFuncao = funcao;
    const initialRamal = ramal;
    const initialStatus= status;
    
    console.log(initialIdSetor,initialNome,initialFuncao,initialRamal,initialStatus)
    
    const Id = setorId;
    [setorId, setSetorId] = useState(initialIdSetor);
    [nome1, setNome] = useState(initialNome);
    [funcao1, setFuncao] = useState(initialFuncao);
    [ramal1, setRamal] = useState(initialRamal);
    [status1, setStatus] = useState(initialStatus);
   
    console.log("Aloooooooo",setorId,nome,funcao,ramal,status)

    async function PUT(){
        const data = { 
            nome : nome1,
            funcao: funcao1,
            ramal : ramal1,
            status : status1,
        }
        
          try {
            const response = await fetch(API_ENDPOINT + 'Funcionarios/resumo/admin/' + idFuncionario, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            //console.log(API_ENDPOINT + 'Funcionarios/resumo/admin/' + idFuncionario)
            //console.log("DATA", response.status)
            if (response.status !== 400) {
              
              Alert.alert('Setor atualizado com sucesso!')
              props.navigation.navigate("ListarFuncionario")
            } else {
              Alert.alert('Erro', data.message || 'Erro ao atualizar.');
            }
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
          }
         
        }
    
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Editar Setor</Text>
            <Text style={styles.text1}>Setor</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o nome setor..." 
            value={initialNome}
            onChangeText={(text) => setNome(text)}
            />
            <Text style={styles.text1}>Função</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite a função..." 
            value={initialFuncao}
            onChangeText={(text) => setFuncao(text)}
            />
            <Text style={styles.text1}>Ramal</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o ramal..." 
            value={setRamal}
            onChangeText={(text) => setRamal(text)}
            />
            <Text style={styles.text1}>Status</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o status..." 
            value={setStatus}
            onChangeText={(text) => setStatus(text)}
            />
        
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => PUT()}>
                <Text style={styles.buttonText}>CONFIRMAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.goBack()}>
                <Text style={styles.buttonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>       
        </View>
    )
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

