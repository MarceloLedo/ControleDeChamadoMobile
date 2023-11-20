import React , { useState, useContext} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Ionicons} from '@expo/vector-icons';

import { Alert } from 'react-native';
import { API_ENDPOINT } from '../../config';
import { MeuContexto } from '../../context/UserContext';


export default props => {
    const [valorLogin, setValorLogin] = useState("");
    const [valorSenha, setValorSenha] = useState("");
    const {set} = useContext(MeuContexto)
    const [hidePass, setHidePass ] = useState(true);
    
  
    
    const URL = API_ENDPOINT + 'Funcionarios/resumo/login'

    const Login = async () => {
        try {
            const response = await fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nomeFuncionario: '', usuario : valorLogin, senha : valorSenha, tipoFuncionarioId: 0, setorId:0}),
            });
        
            const data = await response.json();
                //console.log(data)
                if (response.status === 200) {
                set(data)
                //console.log({ usuario : valorLogin, senha : valorSenha})
                //console.log(response.status)
                if(data.funcionario.tipoFuncionarioId === 1){
                    props.navigation.push("Administrador") 
                }
                if(data.funcionario.tipoFuncionarioId === 2){
                    props.navigation.push("Executador") 
                }
                if(data.funcionario.tipoFuncionarioId === 3){
                    props.navigation.push("Solicitante") 
                }
                
                
                }else {
                
                Alert.alert('Erro', data.message || 'Falha no login');
                console.log(response.status)
                console.log({ usuario : valorLogin, senha : valorSenha})
                }
            }catch (error) {
            
            Alert.alert('Erro', 'Não foi possível conectar ao servidor');
          }
        };
    
    

    return (
        <View style={styles.container}>
            <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
                <Text style={styles.message}>Bem-Vindo(a)</Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" style={styles.containerForm}> 
            <Text style={styles.title}>Email</Text>
            
                        <TextInput 
                        style={styles.input}
                            placeholder="Digite seu email..."
                            value={valorLogin}
                            onChangeText={ (valorLogin) => setValorLogin(valorLogin)}
                        />
                    
                
                <Text style={styles.title}>Senha</Text>
                <View style={styles.inputIcon} >
                   
                        <TextInput 
                            placeholder="Digite Sua senha..." 
                            style={styles.inputIcon} 
                            value={valorSenha}
                            onChangeText={ (valorSenha) => setValorSenha(valorSenha) }
                            secureTextEntry={hidePass}
                        >
                        </TextInput>
           
                    <TouchableOpacity style={styles.icon} onPress={() => setHidePass(!hidePass)}>
                        { hidePass ? <Ionicons name='eye' color='#0EACBC' size={25}/> : <Ionicons name='eye-off' color="#fff" size={25}/>}
                    </TouchableOpacity>
                    
                </View>
            
                <TouchableOpacity 
                    style={styles.button}
                    
                    onPress={()=>{
                        Login()
                    }}
                    
                >
                <Text style={styles.buttonText}>Acessar</Text>
                </TouchableOpacity>
                
                
                    
                <TouchableOpacity style={styles.buttonRegister}>
                    <Text style={styles.registerText}>Não possui uma conta? Solicite para seu Superior</Text>
                </TouchableOpacity>
            </Animatable.View>
            
        </View>
        
    );
    
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0EACBC',
    },
    containerHeader:{
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
    },
    message:{
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    containerForm:{
        backgroundColor: '#fff',
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    title:{
        fontSize: 20,
        marginTop: 28,
    },
    button:{
        backgroundColor: '#0EACBC',
        width: '100%',
        borderRadius: 4,
        paddingVertical: 8,
        marginTop: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText:{
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister:{
        marginTop: 14,
        alignSelf: 'center',
    },
    registerText:{
        color: '#a1a1a1',
    },
    input:{
        borderBottomWidth: 1,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
    },
    inputIcon:{
        flexDirection:'row',
        width: '95%',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        fontSize: 16,
        
        
    },
    icon:{
        width: '15%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    validacaoCampo:{
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    
})