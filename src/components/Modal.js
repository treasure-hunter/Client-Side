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
      <Modal isVisible={this.state.isModalVisible}>
        <View style={{ flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
          <TouchableOpacity onPress={this._toggleModal()}>
            <Image
              style={{width: 250, height: 300, borderRadius: 5}}
              source={{uri: this.state.uri}}
              />
          </TouchableOpacity>
        </View>
      </Modal>
    );
  }
}
