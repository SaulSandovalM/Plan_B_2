import React, {Component} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {CheckBox, Button, Body, List, CardItem, ListItem, Container, Content, Text} from 'native-base';
import {Actions} from 'react-native-router-flux';
import CabeceraTer from './CabeceraTer';

class Terminos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false,
      check1: false,
      check2: false,
      check3: false
    };
  }

  chec1() {
    this.setState({
      check1: !this.state.check1
    });

  }

  chec2() {
    this.setState({
      check2: !this.state.check2
    });

  }

  chec3() {
    this.setState({
      check3: !this.state.check3
    });

  }

  toggle() {
    if (this.state.selected == false || this.state.check1 == false || this.state.check2 == false || this.state.check3 == false) {

      this.setState({selected: true, check1: true, check2: true, check3: true});
    } else {
      this.setState({
        selected: !this.state.selected,
        check1: !this.state.check1,
        check2: !this.state.check2,
        check3: !this.state.check3
      });
    }
  }
  close() {
    BackHandler.exitApp()
  }

  entry() {
    if (this.state.selected == true && this.state.check1 == true && this.state.check2 == true && this.state.check3 == true) {
      Actions.Log()
    } else {
      alert('Acepta terminos y condiciones')
    }
  }

  render() {
    return (
      <Container style={styles.back}>
        <CabeceraTer/>
        <Content>

          <CardItem header>
            <Text style={styles.font}>Términos y condiciones</Text>
          </CardItem>
          <CardItem>
            <Body>

              <List style={styles.list}>
                <Text>Pulse los vínculos a continuación y léalos atentamente. Al marcar las casillas, usted reconoce
                  que ha leído y que acepta los siguientes términos:</Text>

                <ListItem style={styles.ListItem}>
                  <CheckBox checked={this.state.selected} onPress={this.toggle.bind(this)}/>
                  <View style={styles.view}>
                    <Text>Acepto todo</Text>
                  </View>
                </ListItem>
              </List>

              <ListItem style={styles.listItem}>
                <CheckBox checked={this.state.check1} onPress={this.chec1.bind(this)}/>
                <View style={styles.view2}>
                  <Text>He leído y estoy de acuerdo con los Términos y condiciones y los Términos especiales</Text>
                </View>
              </ListItem>

              <ListItem style={styles.listItem}>
                <CheckBox checked={this.state.check2} onPress={this.chec2.bind(this)}/>
                <View style={styles.view2}>
                  <Text>He leído y estoy de acuerdo con las políticas de privacidad.</Text>
                </View>
              </ListItem>

              <ListItem style={styles.listItem}>
                <CheckBox checked={this.state.check3} onPress={this.chec3.bind(this)}/>
                <View style={styles.view2}>
                  <Text>Activar servicios interactivos</Text>
                </View>
              </ListItem>

              <Button block onPress={this.entry.bind(this)}>
                <Text>Acepto</Text>
              </Button>

              <Button onPress={this.close.bind(this)} block style={styles.boton}>
                <Text>No acepto</Text>
              </Button>

            </Body>
          </CardItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  back: {
    backgroundColor: "white"
  },
  font: {
    fontWeight: 'bold'
  },
  list: {
    borderBottomWidth: 2,
    borderBottomColor: 'black'
  },
  listItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'white'
  },
  view: {
    left: 15
  },
  view2: {
    left: 10
  },
  boton: {
    backgroundColor: 'gray',
    top: 6
  },
  check: {
    justifyContent: 'space-between'
  }
});

export default Terminos;
