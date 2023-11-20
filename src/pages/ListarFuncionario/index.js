import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, RefreshControl, StyleSheet, TouchableOpacity,Text } from "react-native";
import { ListItem } from '@rneui/themed';

import { API_ENDPOINT } from "../../config";
import { MeuContexto } from '../../context/UserContext';

export default props => {
    
    const [funcionarios, setFuncionarios] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getFuncionarios = async () => {
        try {
            const response = await fetch(API_ENDPOINT + 'Funcionarios/resumo');
            if (!response.ok) {
                throw new Error('Erro na solicitação HTTP');
            }
            const data = await response.json();
            setFuncionarios(data);
        } catch (error) {
            console.error('Erro ao obter funcionários: ', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    useEffect(() => {
        getFuncionarios();
    }, []); // [] como segundo argumento para garantir que isso seja executado apenas uma vez ao montar o componente
    

    const deleteUser = async (idFuncionario) => {
        const URLCancelar = API_ENDPOINT + 'Funcionarios/' + idFuncionario;
        
        const options = {
            method: 'DELETE'
        };

        fetch(URLCancelar, options)
            .then(response => {
                if(!response.ok){
                    throw new Error('Erro na solicitação HTTP')
                }
                return response.json();
            })
            .then(responseData => {
                console.log("Resposta da requisição: ", responseData)
                Alert.alert(
                    'Exclusão!',
                    'Usuário excluído com sucesso!',
                    [
                        {
                            text: 'Ok',
                            onPress: () => atualiza()
                        }
                    ]
                )
            })
            .catch(error => {
                console.error('Erro: ', error)
            })



        /*try {
            const response = await fetch(URLCancelar, options);
            if (!response.ok) {
                throw new Error('Erro na solicitação HTTP');
            }
            
            const responseData = await response.json();
            //console.log("Resposta da requisição: ", responseData);
            Alert.alert(
                'Exclusão!',
                'Usuário excluído com sucesso!',
                [
                    {
                        text: 'Ok',
                        onPress: () => atualiza() // Atualiza a lista após a exclusão
                    }
                ]
            );
        } catch (error) {
            console.error('Erro: ', error);
        }*/
    };

    function deleteConfirm(idFuncionario) {
        Alert.alert('Excluir usuário!', 'Tem certeza que deseja excluir o usuário?',
            [
                {
                    text: "Sim",
                    onPress() {
                        deleteUser(idFuncionario);
                    }
                },
                {
                    text: "Não"
                }
            ]
        );
    }

    function getUserItem({ item: user }) {
        return (
            <View style={styles.button1}>
            <ListItem key={user.id}>
                <ListItem.Content>
                    <ListItem.Title>{user.nomeFuncionario}</ListItem.Title>
                    <ListItem.Subtitle>{user.usuario}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron
                    name="edit"
                    color="orange"
                    size={25}
                    onPress={() => props.navigation.navigate("EditarFuncionario", { userId: user.idFuncionario, userNome: user.nomeFuncionario, userUsuario : user.usuario} )}
                    
                />
                <ListItem.Chevron
                    name="delete"
                    color="red"
                    size={25}
                    
                    onPress={() =>  deleteConfirm(user.idFuncionario) }
                    
                />
               
            </ListItem>
            </View>
        );
    }

    const atualiza = async () => {
        setIsRefreshing(true);
        await getFuncionarios();
        setIsRefreshing(false);
    };

    return (
        
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('CriarFuncionario')}>
                    <Text style={styles.buttonText}>ADICIONAR USUÁRIO</Text>
                </TouchableOpacity>
            </View>   
            <View style={styles.button1}>
                <FlatList
                    
                    data={funcionarios}
                    keyExtractor={user => user.id} // Convertido para string, pois a chave geralmente é uma string
                    renderItem={getUserItem}
                    refreshControl={
                        <RefreshControl
                         onRefresh={atualiza}
                         refreshing={isRefreshing}
                        />
                    }   
                />
            </View> 
            

            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => getFuncionarios()}>
                    <Text style={styles.buttonText}>ATUALIZAR</Text>
                </TouchableOpacity>
           
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.push("Administrador")}>
                    <Text style={styles.buttonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>         
            
        </View>
    );
};


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
