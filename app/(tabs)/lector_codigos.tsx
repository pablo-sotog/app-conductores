import { BarcodeScanningResult, CameraType, CameraView, FlashMode, useCameraPermissions } from 'expo-camera';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LectorCodigos() {
  const [facing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [modoFlash, setModoFlash] = useState<FlashMode>('off');
  const [escaneado, setEscaneado] = useState(false);
  const ref = useRef<CameraView>(null);
  const escaneandoRef = useRef(false);

  const handleBarcodeScanned = async (scanningResult: BarcodeScanningResult) => {
    if (escaneandoRef.current) return;

    escaneandoRef.current = true;
    setEscaneado(true);
    await ref.current?.pausePreview();
    Alert.alert('Código QR escaneado', scanningResult.data, [
      {
        text: 'OK',
        onPress: () => {
          escaneandoRef.current = false;
          setEscaneado(false);
          ref.current?.resumePreview();
        },
      },
    ]);
  };

  if (!permission) {
    return <ActivityIndicator size={'small'} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para acceder a la camara</Text>
        <Button onPress={requestPermission} title="Permitir acceso" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={ref}
        style={styles.camera} facing={facing}
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={escaneado ? undefined : handleBarcodeScanned}
        enableTorch={modoFlash === 'on'}
        mode='picture'
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => {
          modoFlash === 'off' ? setModoFlash('on') : setModoFlash('off')
        }}>
          <Text>{modoFlash === 'off' ? 'Encender flash' : 'Apagar flash'}</Text>
        </TouchableOpacity>
      </View>
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
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
