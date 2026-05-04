import { useState, useRef } from 'react'; 
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';

export default function App() {
  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();
  
  // Referencia para la cámara
  const ref = useRef(null);
  

  const [uri, setUri] = useState(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Necesitamos tu permiso para acceder a la cámara
        </Text>
        <Button onPress={requestPermission} title="Conceder permiso" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  async function tomarFoto() {
    if (ref.current) {
      try {
        const photo = await ref.current.takePictureAsync();
        if (photo?.uri) {
          setUri(photo.uri);
          alert("Foto tomada con éxito"); 
          console.log("URI:", photo.uri);
        }
      } catch (error) {
        console.log("Error al tomar foto:", error);
      }
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={ref}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Voltear</Text>
          </TouchableOpacity>
          
          <Pressable style={styles.button} onPress={tomarFoto}>
            <Text style={styles.text}>Tomar Foto</Text>
          </Pressable>
        </View>
      </CameraView>
    </View>
  );
}

 const styles = StyleSheet.create({

container: {

flex: 1,

justifyContent: 'center',

},

message: {

textAlign: 'center',

paddingBottom: 10,

},

camera: {

flex: 1,

},

buttonContainer: {

flex: 1,

flexDirection: 'row',

backgroundColor: 'transparent',

margin: 64,

},

button: {

flex: 1,

alignSelf: 'flex-end',

alignItems: 'center',

},

text: {

fontSize: 24,

fontWeight: 'bold',

color: 'white',

textAlign: 'center',

},

}); 