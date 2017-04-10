/**
 * InputButton.js
 *
 * Created by kylewbanks on 2016-08-07.
 */
'use strict'

import React, { Component } from 'react'
import {
    TouchableHighlight,
    Text
} from 'react-native'

import Style from './Style'
import InputButton from './InputButton'

export default class RollButton extends InputButton {

  render () {
    return (
      <TouchableHighlight style={[Style.inputButton, Style.rollButton, this.props.highlight ? Style.rollButtonHighlighted : null]}
                          underlayColor="#193441"
                          onPress={this.props.onPress}>
        <Text style={Style.inputButtonText, Style.rollButtonText}>{this.props.value}</Text>
      </TouchableHighlight>
    )
  }

}
