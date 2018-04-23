import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, IconNB } from "native-base";

import { fetchQuests } from '../store/quest/quest-actions'
import { fetchPosition } from '../store/ARScene/ar-action'

export class RoomDetail extends Component {
  componentDidMount () {
    this.props.fetchQuests()
  }

  onGameClick = (quest) => {
    this.props.fetchPosition({
      longitude: quest.longitude,
      latitude: quest.latitude,
      image_path: quest.image_path
    })
    this.props.toGamePlay()
  }


  render() {
    return (
      <Container>
        <Content padder>
          {
            this.props.quests.map((quest, i) => (
              <Card>
                <CardItem header bordered button onPress={ () => this.onGameClick(quest) }>
                  <Text>{ quest.roomName }</Text>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      { quest.description }
                    </Text>
                  </Body>
                </CardItem>
                <CardItem bordered>
                  <Body>
                    <Text>
                      { quest.hint }
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            ))
          }
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  ...state.fetchQuests
})

const mapDispatchToProps = dispatch => bindActionCreators ({
  fetchQuests,
  fetchPosition
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail)
