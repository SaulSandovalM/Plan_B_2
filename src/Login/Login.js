import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import firebase, {firebaseAuth} from '../Firebase/Firebase';
import FBSDK, {LoginButton, AccessToken} from 'react-native-fbsdk';
import {Button, Icon, Item, Input} from 'native-base';
import {Actions} from 'react-native-router-flux';

const {FacebookAuthProvider} = firebase.auth

class Login extends Component {
  state = {
    email: '',
    contraseña: '',
    error: '',
    credential: ''
  };

  constructor(props) {
    super(props);
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.onLoginFailed = this.onLoginFailed.bind(this);
    this.onLoginFailedReg = this.onLoginFailedReg.bind(this);
  }

  componentWillMount() {
    this.authenticateUser();
    firebaseAuth.onAuthStateChanged(function(user) {
      console.log('user', user)

      var db = firebase.database();
      var storage = firebase.storage();
      if (user) {
        var uid = user.uid;
        var exists = false;

        db.ref('usuarios').once('value').then(function(snapshot) {
          snapshot.forEach(function(key) {
            console.log(key.val());
            if (key.val().uid == uid) {
              exists = true;
            }
          });
          if (exists == false) {
            db.ref('usuarios').push({uid: uid, nombre: user.displayName, email: user.email, profileImage: user.photoURL});
          }
        });
      }
    });
  }

  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const {accessToken} = data
      const credential = FacebookAuthProvider.credential(accessToken)
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        Actions.Inicio();
      }, (error) => {
        console.log("Sign in error", error)
      })
    }).catch((error) => {
      console.log("Sign in error", error)
    });
  }

  onButtonPress() {
    const {email, contraseña} = this.state;
    this.setState({error: ''});
    firebaseAuth.signInWithEmailAndPassword(email, contraseña).then(this.onLoginSuccess).catch(this.onLoginFailed);

  }
  onButtonPressReg() {
    const {email, contraseña} = this.state;
    this.setState({error: ''});
    firebaseAuth.createUserWithEmailAndPassword(this.state.email, this.state.contraseña).then(this.onLoginSuccess)
    .catch(this.onLoginFailedReg);

  }

  onLoginFailed() {
    this.setState({error: 'Autenticación Fallida'});
    alert('Registrate!')
  }

  onLoginFailedReg() {
    this.setState({error: 'Autenticación Fallida'});
    alert('Verifica los campos!')
  }

  onLoginSuccess() {
    this.setState({email: '', contraseña: '', error: ''});
  }

  render() {
    return (
      <Image source={require('../assets/fn.jpg')} style={styles.img}>

        <Text style={styles.texto}>BIENVENIDO</Text>

        <View style={styles.view}>
          <LoginButton readPermissions={['public_profile', 'email']} onLoginFinished={this.handleLoginFinished}
            onLogoutFinished={() => alert("Adios.")}/>
        </View>

        <Item rounded style={styles.inputRounded}>
          <Input style={styles.input} autoCapitalize='none' placeholder='Correo electrónico'
            keyboardType='email-address' placeholderTextColor='black' returnKeyType='next' value={this.state.text}
            onChangeText={email => this.setState({email})}/>
        </Item>

        <Item rounded style={styles.inputRounded}>
          <Input style={styles.input} placeholder='Contraseña' placeholderTextColor='black' secureTextEntry={true}
            value={this.state.contraseña} onChangeText={contraseña => this.setState({contraseña})}/>
        </Item>

        <View style={styles.botones}>
          <Button rounded block style={styles.buttonIngreso} onPress={this.onButtonPress.bind(this)}>
            <Text style={styles.boton}>INGRESA</Text>
          </Button>

          <Button rounded block style={styles.buttonRegistro} onPress={this.onButtonPressReg.bind(this)}>
            <Text style={styles.boton}>REGISTRATE</Text>
          </Button>
        </View>
      </Image>
    );
  }
}

handleLoginFinished = (error, result) => {
  if (error) {
    console.error(error)
  } else if (result.isCancelled) {
    console.log("login is cancelled.");
  } else {
    this.authenticateUser()
    alert('FuncionHandle')
  }
}

const styles = StyleSheet.create({
  img: {
    justifyContent: 'space-around',
    flex: 2,
    height: null,
    width: null,
    opacity: 15
  },
  texto: {
    color: 'white',
    fontSize: 40,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    backgroundColor: 'transparent'
  },
  view: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  view1: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  inputRounded: {
    marginRight: 40,
    marginLeft: 40,
    borderColor: '#ccc',
    borderWidth: 3,
    backgroundColor: 'white'
  },
  input: {
    color: 'black'
  },
  buttonIngreso: {
    width: '38%',
    marginLeft: 40,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#4DA49B'
  },
  buttonRegistro: {
    width: '38%',
    marginRight: 40,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#4DA49B'
  },
  boton: {
    color: 'white',
    fontWeight: 'bold'
  },
  font: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white'
  },
  botones: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default Login;
