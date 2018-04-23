import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Col, Row } from 'react-native-easy-grid'
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  IconNB,
  Thumbnail
} from "native-base";

import { fetchQuests } from '../store/quest/quest-actions'

export class RoomDetail extends Component {
  componentDidMount () {
    this.props.fetchQuests()
  }

  render() {
    return (
      <Container>
        <Content padder style={{ padding: 4 }}>
          {
            this.props.quests.map((quest, i) => (
            <Grid>
              <Col style={{ alignSelf:'center', width:110 }}>
              <Thumbnail square large source={{uri: quest.image_path}} style={{ width: 100 }}/>
              </Col>
              <Col>
                <Card key={i} style={{ backgroundColor: 'rgba(52,52,52,alpha)' }}>
                  <CardItem
                  style={{ backgroundColor: 'rgba(52,52,52,alpha)' }}
                  header bordered button onPress={ () => this.props.toGamePlay() }>
                    <Text style={{ fontFamily: 'futura', color: '#F1F1F4', fontWeight: '900' }}>{ quest.roomName }</Text>
                  </CardItem>
                  <CardItem
                  style={{ backgroundColor: 'rgba(52,52,52,alpha)' }}
                  bordered>
                    <Body>
                      <Text style={{ fontSize: 13, fontFamily: 'futura', color: '#D8D6E1', fontWeight: '500' }}>
                        { quest.description }
                      </Text>
                    </Body>
                  </CardItem>
                  {/* <CardItem
                  style={{ backgroundColor: 'rgba(52,52,52,alpha)' }}
                  bordered>
                    <Body>
                      <Text style={{ fontFamily: 'futura', color: '#D8D6E1', fontWeight: '500' }}>
                        { quest.hint }
                      </Text>
                    </Body>
                  </CardItem> */}
                </Card>
              </Col>
          </Grid>
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