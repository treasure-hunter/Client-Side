import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Container, Header, Title, Content, Button, Icon, Card, CardItem, Text, Body, Left, Right, IconNB } from "native-base";

import { fetchQuests } from '../store/quest/quest-actions'

export class RoomDetail extends Component {
  componentDidMount () {
    this.props.fetchQuests()
  }

  render() {
    return (
      <Container>
        <Content padder>
          {
            this.props.quests.map((quest, i) => (
              <Card>
                <CardItem header bordered>
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
  fetchQuests
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(RoomDetail)