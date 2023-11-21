import { useRoute } from '@react-navigation/native';
import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import { API_ENDPOINT } from "../../config";
import React, { useState } from 'react';


export default props =>{
    const route = useRoute();
    const { idSetor } = route.params;
    const { setorNome } = route.params;
    const { setorFuncao  } = route.params;
    const { setorRamal } = route.params;
    const { setorStatus } = route.params;
    
    const initialIdSetor = idSetor ;
    const initialNome = setorNome ;
    const initialFuncao = setorFuncao;
    const initialRamal = setorRamal;
    const initialStatus= setorStatus;
    
    //console.log(initialIdSetor,initialNome,initialFuncao,initialRamal,initialStatus)

    const Id = idSetor;
    [IdSetor, setIdSetor] = useState(initialIdSetor);
    [nome1, setNome] = useState(initialNome);
    [funcao1, setFuncao] = useState(initialFuncao);
    [ramal1, setRamal] = useState(initialRamal);
    [status1, setStatus] = useState(initialStatus);
   
    
    //console.log("Aloooooooo",IdSetor,nome1,funcao1,ramal1,status1)

    async function PUT(){
        let statusBoolean = status1.toLowerCase() === "true";
        
        const data = { 
            nome : nome1,
            funcao: funcao1,
            ramal : ramal1,
            status : statusBoolean,
        }
        
          try {
            const response = await fetch(API_ENDPOINT + 'Setores/resumo/' + Id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            //console.log(API_ENDPOINT + 'Setores/resumo/' + Id)
            console.log("DATA", data)
            if (response.status !== 400) {
              Alert.alert('Setor atualizado com sucesso!')
              props.navigation.navigate("ListarSetor")
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
            value={nome1}
            onChangeText={(text) => setNome(text)}
            />
            <Text style={styles.text1}>Função</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite a função..." 
            value={funcao1}
            onChangeText={(text) => setFuncao(text)}
            />
            <Text style={styles.text1}>Ramal</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o ramal..." 
            value={ramal1}
            onChangeText={(text) => setRamal(text)}
            />
            <Text style={styles.text1}>Status</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o status..." 
            value={status1}
            onChangeText={(text) => setStatus(text)}
            />

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => PUT()}>
                <Text style={styles.buttonText}>ATUALIZAR</Text>
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

