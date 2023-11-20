import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import { API_ENDPOINT } from "../../config";
import { useRoute } from '@react-navigation/native';
import React, { useState } from 'react';



export default props =>{
    const route = useRoute();
    const { userId } = route.params;
    const { userNome } = route.params;
    const { userUsuario } = route.params;
    const { userStatus } = route.params;
    
    
    const initialIdFuncionario = userId;
    const initialNomeFuncionario = userNome;
    const initialUsuario = userUsuario;
    //const initialSenha = userId.senha;
    //const initialTipoFuncionarioId = userId.tipoFuncionarioId;
    const initialStatus = userStatus;
    //const initialSetorId = userId.setorId;
    //console.log(initialIdFuncionario,initialNomeFuncionario,initialUsuario,initialSenha,initialTipoFuncionarioId,initialStatus,initialSetorId)
    
    const Id = userId;
    [idFuncionario, setIdFuncionario] = useState(initialIdFuncionario);
    [nomeFuncionario1, setNomeFuncionario] = useState(initialNomeFuncionario);
    [usuario1, setUsuario] = useState(initialUsuario);
    [senha1, setSenha] = useState("");
    [tipoFuncionarioId1, setTipoFuncionarioId] = useState("");
    [parseIntStatus1, setStatus] = useState(initialStatus);
    [setorId1, setSetorId] = useState("");

    console.log("Aloooooooo",idFuncionario,nomeFuncionario1,usuario1,senha1,tipoFuncionarioId1,parseIntStatus1,setorId1)

    async function PUT(){
        const data = { 
            nomeFuncionario: nomeFuncionario1,
            usuario : usuario1,
            senha : senha1,
            status: parseIntStatus1,
            tipoFuncionarioId: tipoFuncionarioId1,
            setorId: setorId1
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
              
              Alert.alert('Cadastro atualizado com sucesso!')
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
            <Text style={styles.title}>Editar Funcionario </Text>
            <Text style={styles.text1}>Nome Funcionario</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o nome do funcionário..." 
            value={initialNomeFuncionario}
            //onChangeText={(text) => setNomeFuncionario(text)}
            />
            <Text style={styles.text1}>Usuario</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o nome de usuário..." 
            value={initialUsuario}
            //onChangeText={(text) => setUsuario(text)}
            />
            <Text style={styles.text1}>Status</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o status do funcionario..." 
            //value={parseIntStatus1}
            value={initialStatus}
            //onChangeText={(text) => setStatus(text)}
            />
            <Text style={styles.text1}>Tipo Funcionario Id</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o Tipo de Funcionario..." 
            value={tipoFuncionarioId1}
            onChangeText={(text) => setTipoFuncionarioId(text)}
            />
            <Text style={styles.text1}>Setor Id</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Digite o setor do funcionario..." 
            value={setorId1}
            onChangeText={(text) => setSetorId(text)}
            />
            <Text style={styles.text1}>Senha</Text>
            <TextInput 
            style={styles.text2}
            caretHidden={false} 
            placeholder="Digite a senha do Funcionario..." 
            secureTextEntry={true}
            value={senha1}
            onChangeText={ (text)  => setSenha(text) }
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
