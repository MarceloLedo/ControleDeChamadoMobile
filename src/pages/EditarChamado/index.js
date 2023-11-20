import {  Alert, StyleSheet, TextInput, View, Text, TouchableOpacity } from "react-native"
import { useState, useContext } from "react";
import { MeuContexto } from "../../context/UserContext";
import { API_ENDPOINT } from "../../config";
import { useRoute } from '@react-navigation/native';


export default props =>{
    const route = useRoute();
    const { chamadoId } = route.params;
    const { titulo } = route.params;
    const { descricao } = route.params;
    const { status } = route.params;
    const { prioridade  } = route.params;
    const { classificacaoId } = route.params;
    const { solicitanteId} = route.params;
     
    const initialIdChamado= chamadoId;
    const initialTitulo = titulo;
    const initialDescricao = descricao;
    const initialStatus = status;
    const initialPrioridade = prioridade;
    const initialClassificacaoNome = classificacaoId;
    const initialSolicitanteNome = solicitanteId;

    console.log("Dado",initialIdChamado,initialTitulo,initialDescricao,initialStatus,initialPrioridade,initialClassificacaoNome,initialSolicitanteNome)
    
    const Id = userId;
    [idChamado1, setIdChamado] = useState(initialIdChamado);
    [titulo1, setTitulo] = useState(initialTitulo);
    [descricao1, setDescricao] = useState(initialDescricao);
    [status1, setStatus] = useState(initialStatus);
    [prioridade1, setPrioridade] = useState(initialPrioridade);
    [classificacaoNome1, setClassificacaoNome] = useState(initialClassificacaoNome);
    [solicitanteNome1, setSolicitanteNome] = useState(initialSolicitanteNome);
    [executanteId1, setExecutante] = useState("");

    console.log("Aloooooooo",idChamado1,titulo1,descricao1,status1,prioridade1,classificacaoNome1,solicitanteNome1,executanteId1)

    async function PUT(){
        const data = { 
            titulo: titulo1,
            descricao: descricao1,
            status: status1,
            prioridade: prioridade1,
            classificacaoId: classificacaoNome1,
            solicitanteId: solicitanteNome1,
            executanteId: executanteId1
        }
        
          try {
            const response = await fetch(API_ENDPOINT + 'Chamados/resumo/' + idChamado1, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });
            //console.log(API_ENDPOINT + 'Funcionarios/resumo/admin/' + idFuncionario)
            console.log("DATA", data)
            console.log("DATA", response.status)
            if (response.status !== 400) {
              
              Alert.alert('Cadastro atualizado com sucesso!')
              props.navigation.goBack()
            } else {
              Alert.alert('Erro', data.message || 'Erro ao atualizar.');
            }
          } catch (error) {
            Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
          }
         
        }
    
    

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Editar Chamado</Text>
            <Text style={styles.text1}>Título</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Título..." 
            value={initialTitulo}
            //onChangeText={(text) => setNomeFuncionario(text)}
            />
            <Text style={styles.text1}>Descrição</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Descrição..." 
            value={initialDescricao}
            //onChangeText={(text) => setUsuario(text)}
            />
            <Text style={styles.text1}>Status</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Status..." 
            value={status1}
            onChangeText={(text) => setStatus(text)}
            />
            <Text style={styles.text1}>Prioridade</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Prioridade..." 
            value={initialPrioridade}
            onChangeText={(text) => setPrioridade(text)}
            />
            <Text style={styles.text1}>Classificacao Id</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Classificacao..." 
            value={initialClassificacaoNome}
            onChangeText={(text) => setClassificacaoNome(text)}
            />
            <Text style={styles.text1}>Solicitante Id</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Solicitante..." 
            value={initialSolicitanteNome}
            onChangeText={ (text)  => setSolicitanteNome(text) }
            />
            <Text style={styles.text1}>Executante Id</Text>
            <TextInput 
            style={styles.text2}
            placeholder="Executante..." 
            value={executanteId1}
            onChangeText={ (text)  => setExecutante(text) }
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
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 28,
        marginBottom: 12,
        marginLeft: 4,
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
    text6:{
        backgroundColor: '#fff',
        color: '#0EACBC',
        fontSize: 14,
        padding:8,
        borderRadius: 10,
        marginTop:5,
        marginLeft: 4
    },
    button1:{
        borderRadius: 10,
        paddingVertical: 3,
        width: '100%',
        margin: 2,
        padding: 10,
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
