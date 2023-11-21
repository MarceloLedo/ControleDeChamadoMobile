import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert, RefreshControl, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { ListItem } from '@rneui/themed';

import { API_ENDPOINT } from "../../config";
import { MeuContexto } from '../../context/UserContext';

export default props => {
    
    const [funcionarios, setFuncionarios] = useState([]);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const getSetor = async () => {
        try {
            const response = await fetch(API_ENDPOINT + 'Setores/resumo');
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
        getSetor();
    }, []); // [] como segundo argumento para garantir que isso seja executado apenas uma vez ao montar o componente
    

    const deleteUser = async (idSetor) => {
        const URLCancelar = API_ENDPOINT + 'Setores/' + idSetor;
        
        const options = {
            method: 'DELETE'
        };

        try {
            
            console.log(URLCancelar)
            const response = await fetch(URLCancelar, options);
            if (!response.ok) {
                throw new Error('Erro na solicitação HTTP');
            }
            const responseData = await response.json();
            console.log("Resposta da requisição: ", responseData);
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
        }
    };

    function deleteConfirm(idSetor) {
        Alert.alert('Excluir usuário!', 'Tem certeza que deseja excluir o usuário?',
            [
                {
                    text: "Sim",
                    onPress() {
                        deleteUser(idSetor);
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
                    <ListItem.Title>{user.nome}</ListItem.Title>
                    <ListItem.Subtitle>{user.funcao}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron
                    name="edit"
                    color="#FFDEAD"
                    size={25}
                    //onPress={() => props.navigation.navigate("EditarSetor", user.idSetor)}
                    onPress={() => props.navigation.navigate("EditarSetor", {idSetor: user.idSetor, setorNome: user.nome, setorFuncao : user.funcao, setorRamal: user.ramal, setorStatus : user.status})}
                />
                <ListItem.Chevron
                    name="delete"
                    color="red"
                    size={25}
                    onPress={() => { deleteConfirm(user.idSetor) }}
                />
            </ListItem>
            </View>
        );
    }

    const atualiza = async () => {
        setIsRefreshing(true);
        await getSetor();
        setIsRefreshing(false);
    };

    return (
        <>
       
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('CriarSetor')}>
                    <Text style={styles.buttonText}>ADICIONAR SETOR</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => getSetor()}>
                    <Text style={styles.buttonText}>ATUALIZAR</Text>
                </TouchableOpacity>
           
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.push("Administrador")}>
                    <Text style={styles.buttonText}>VOLTAR</Text>
                </TouchableOpacity>
            </View>   
           
        </View>
        </>
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
