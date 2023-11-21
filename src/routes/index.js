import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../pages/Welcome';
import SignIn from '../pages/SignIn';
import Administrador from '../pages/Administrador';
import Solicitante from '../pages/Solicitante'
import Executador from '../pages/Executador';
import ListarFuncionario from '../pages/ListarFuncionario';
import ListarSetor from '../pages/ListarSetor';
import CriarSetor from '../pages/CriarSetor';
import CriarFuncionario from '../pages/CriarFuncionario';
import CriarChamado from '../pages/CriarChamado';
import EditarChamado from '../pages/EditarChamado';
import SeusChamados from '../pages/SeusChamados';
import TodosChamados from '../pages/TodosChamados';
import EditarFuncionario from '../pages/EditarFuncionario';
import EditarSetor from '../pages/EditarSetor';
import EditarChamadoDelete from '../pages/EditarChamadoDelete';





const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator initialRouteName='Welcome'>
            <Stack.Screen  name='Welcome' component={Welcome} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='SignIn' component={SignIn} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='Administrador' component={Administrador} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='Solicitante' component={Solicitante} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='Executador' component={Executador} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='ListarFuncionario' component={ListarFuncionario} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='ListarSetor' component={ListarSetor} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='CriarSetor' component={CriarSetor} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='CriarFuncionario' component={CriarFuncionario} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='CriarChamado' component={CriarChamado} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='EditarChamado' component={EditarChamado} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='SeusChamados' component={SeusChamados} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='TodosChamados' component={TodosChamados} options={{headerShown: false}}>
                
            </Stack.Screen>

            <Stack.Screen name='EditarFuncionario' component={EditarFuncionario} options={{headerShown: false}}>
                
            </Stack.Screen>
            <Stack.Screen name='EditarSetor' component={EditarSetor} options={{headerShown: false}}>
                
            </Stack.Screen>
            <Stack.Screen name='EditarChamadoDelete' component={EditarChamadoDelete} options={{headerShown: false}}>
                
            </Stack.Screen>
        </Stack.Navigator>
    )
}