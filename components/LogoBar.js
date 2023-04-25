import { Image, StyleSheet, View } from 'react-native';
        
export default LogoBar = () => {
    return (
        <View>
             <Image source={require('../assets/images/Middle_Logo.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        height: 100,
        width: 100
    }
})