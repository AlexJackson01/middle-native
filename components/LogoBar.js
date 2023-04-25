import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
        
export default LogoBar = () => {
    return (
        <SafeAreaView>
             <Image source={require('../assets/images/Middle_Logo.png')} style={styles.logo} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    logo: {
        height: 160,
        width: 160,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50
    }
})