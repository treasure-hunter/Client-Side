import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Image} from 'react-native';
import { Thumbnail } from 'native-base'

export default class ModalExample extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Thumbnail large source={{ uri: this.props.image }} style={{ width: 300, height: 500, alignSelf:'center' }}/>
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show modal</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
