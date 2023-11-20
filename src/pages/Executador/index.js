import { View, TouchableOpacity, Text, StyleSheet, FlatList, ActivityIndicator } from "react-native"



export default props => {

return (
    <>
        <View style={styles.container}>
            <View style={styles.containerButton}>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('SeusChamados')}>
                    <Text style={styles.buttonText1}>SEUS CHAMADOS ABERTOS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('TodosChamados')}>
                    <Text style={styles.buttonText}>TODOS CHAMADOS</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.text}>CHAMADO  CLASSIFICACAO  STATUS  PRIORIDADE  SOLICITANTE</Text>
            </View>
            <View style={styles.button1}>

            {isLoading ? (
                    <ActivityIndicator size={80} />
                ) : (
                        <FlatList 
                        data={data}
                        keyExtractor={({id}) => id}
                        renderItem={({item: chamado}) => (
                            <Text style={styles.text1}>
                            {chamado.idChamado}    {chamado.classificacaoNome}    {chamado.status}    {chamado.prioridade}    {chamado.solicitanteNome}
                            </Text>
                        )}
                        />

                )
                }
            </View>
            <Button title="Atualizar" onPress={ () => getChamados()} />
            
        </View>
        

    </>

)}

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
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
        padding:5.8,
    },
    buttonText1:{
        fontSize: 16,
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
