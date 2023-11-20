import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import { useState, useContext } from "react";
import { MeuContexto } from "../../context/UserContext";
import { API_ENDPOINT } from "../../config";
import { useRoute } from '@react-navigation/native';


export default props =>{
    const route = useRoute();
    const { userId } = route.params;
    const { userNome } = route.params;
    const { userUsuario } = route.params;
    
    
    const initialIdFuncionario = userId;
    const initialNomeFuncionario = userNome;
    const initialUsuario = userUsuario;
    //const initialSenha = userId.senha;
    //const initialTipoFuncionarioId = userId.tipoFuncionarioId;
    //const initialStatus = userId.status;
    //const initialSetorId = userId.setorId;
    //console.log(initialIdFuncionario,initialNomeFuncionario,initialUsuario,initialSenha,initialTipoFuncionarioId,initialStatus,initialSetorId)
    
    const Id = userId;
    [idFuncionario, setIdFuncionario] = useState(initialIdFuncionario);
    [nomeFuncionario1, setNomeFuncionario] = useState(initialNomeFuncionario);
    [usuario1, setUsuario] = useState(initialUsuario);
    [senha1, setSenha] = useState("");
    [tipoFuncionarioId1, setTipoFuncionarioId] = useState("");
    [parseIntStatus1, setStatus] = useState("");
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
            const response = await fetch(API_ENDPOINT + 'Funcionarios/resumo/admin/' + Id, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            
            console.log("DATA", data)
            if (response.status !== 400) {
              set(data)
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
            <Text>Alterar dados: </Text>
            <Text>Nome Funcionario</Text>
            <TextInput 
            placeholder="nomeFuncionario" 
            value={initialNomeFuncionario}
            //onChangeText={(text) => setNomeFuncionario(text)}
            />
            <Text>Usuario</Text>
            <TextInput 
            placeholder="usuario" 
            value={initialUsuario}
            //onChangeText={(text) => setUsuario(text)}
            />
            <Text>Status</Text>
            <TextInput 
            placeholder="Status" 
            value={parseIntStatus1}
            onChangeText={(text) => setStatus(text)}
            />
            <Text>Tipo Funcionario Id</Text>
            <TextInput 
            placeholder="Tipo Funcionario Id" 
            value={tipoFuncionarioId1}
            onChangeText={(text) => setTipoFuncionarioId(text)}
            />
            <Text>Setor Id</Text>
            <TextInput 
            placeholder="SetorId" 
            value={setorId1}
            onChangeText={(text) => setSetorId(text)}
            />
            <Text>Senha</Text>
            <TextInput 
            caretHidden={false} 
            placeholder="Senha" 
            secureTextEntry={true}
            value={senha1}
            onChangeText={ (text)  => setSenha(text) }
            />
            

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => PUT()}>
                    <Text style={styles.buttonText}>CONFIRMAR</Text>
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
    containerCenter:{
       
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
        fontSize: 14,
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
        paddingVertical: 3,
        width: '100%',
        margin: 2,
        padding: 10,
    },
})
