/**
 * ReactCalculator.js
 *
 * Created by kylewbanks on 2016-08-07.
 */
'use strict'

import React, { Component } from 'react'
import {
    View,
    Text,
    StatusBar,
    AppRegistry
} from 'react-native'
import Style from './Style'
import InputButton from './InputButton'
import DiceButton from './DiceButton'
import DeleteButton from './DeleteButton'
import RollButton from './RollButton'
import OperatorButton from './OperatorButton'
import math from 'mathjs'

const buttons = [
    ['D4', 'D6', 'D8', 'D10'],
    ['D12', 'D20', 'D100', 'D'],
    ['(', ')', 'DEL', 'AC'],
    ['+', '1', '2', '3'],
    ['-', '4', '5', '6'],
    ['x', '7', '8', '9'],
    ['/', 'ROLL', '0']
]

const operators = ['+', '-', '/', 'x', '(', ')']

class DungeonDice extends Component {

  constructor (props) {
    super(props)

    this.initialState = {
      text: '',
      textColor: 'white',
      lastEquation: '',
      result: '',
      isError: false
    }
    this.state = this.initialState
  }

  render () {
    return (
      <View style={Style.rootContainer}>
        <StatusBar barStyle='light-content'/>
        <View style={Style.displayContainer}>
          <Text style={[Style.displayText, {color: this.state.textColor}]}>{this.state.text}</Text>
        </View>
        <View style={Style.inputContainer}>
          <View style={Style.buttonsContainer}>
            {this.renderButtons(buttons)}
          </View>
        </View>
      </View>
    )
  }
  renderButtons (buttons) {

    let views = buttons.map((row, idx) => {
      let inputRow = row.map((buttonVal, columnIdx) => {
        switch (buttonVal) {
          case 'D4':
          case 'D6':
          case 'D8':
          case 'D10':
          case 'D12':
          case 'D20':
          case 'D100':
          case 'D':
            return <DiceButton
                      value={buttonVal}
                      highlight={this.state.selectedSymbol === buttonVal}
                      onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                      key={'butt-' + columnIdx} />
          case 'DEL':
          case 'AC':
            return <DeleteButton
                      value={buttonVal}
                      highlight={this.state.selectedSymbol === buttonVal}
                      onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                      key={'butt-' + columnIdx} />
          case 'ROLL':
            return <RollButton
                      value={buttonVal}
                      highlight={this.state.selectedSymbol === buttonVal}
                      onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                      key={'butt-' + columnIdx} />
          case '+':
          case '-':
          case 'x':
          case '/':
          case '(':
          case ')':
            return <OperatorButton
                      value={buttonVal}
                      highlight={this.state.selectedSymbol === buttonVal}
                      onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                      key={'butt-' + columnIdx} />
          default:
            return <InputButton
                      value={buttonVal}
                      highlight={this.state.selectedSymbol === buttonVal}
                      onPress={this.onInputButtonPressed.bind(this, buttonVal)}
                      key={'butt-' + columnIdx} />
        }
      })
      return <View style={Style.inputRow} key={'row-' + idx}>{inputRow}</View>
    })

    return views
  }

  onInputButtonPressed (input) {
    switch (input) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        return this.handleNumberInput(input)
      case 'D4':
      case 'D6':
      case 'D8':
      case 'D10':
      case 'D12':
      case 'D20':
      case 'D100':
      case 'D':
        return this.handleDiceInput(input)
      default:
        return this.handleStringInput(input)
    }
  }

  handleNumberInput (num) {
    this.updateField(num)
  }

  handleDiceInput (str) {
    return this.updateField(str)
  }

  handleStringInput (str) {
    switch (str) {
      case '+':
      case '-':
      case 'x':
      case '/':
      case '(':
      case ')':
        this.updateField(str)
        break
      case 'ROLL':
        if (this.state.text.includes('=')) {
          let equation = this.state.lastEquation
          let oldResult = this.getResultWith(equation)
          if (isNaN(oldResult)) {
            this.toggleTextColor()
            setTimeout(() => {
              this.toggleTextColor()
            }, 500)
            return this.setState({text: equation})
          } else {
            let newText = this.state.lastEquation + ' = ' + oldResult
            return this.setState({lastEquation: equation, text: newText})
          }
        } else {
          let equation = this.state.text
          let result = this.getResultWith(equation)

          if (isNaN(result)) {
            this.toggleTextColor()
            setTimeout(() => {
              this.toggleTextColor()
            }, 500)
            return this.setState({text: equation})
          } else {
            let newText = this.state.text + ' = ' + result
            return this.setState({lastEquation: equation, text: newText})
          }
        }
      case 'AC':
        this.setState(this.initialState)
        break
      case 'DEL':
        var strMinusLastCharacter = this.state.text.slice(0, -1)
        var strMinusWhiteSpace = strMinusLastCharacter.trim()
        return this.setState({text: strMinusWhiteSpace})
    }
  }

  updateField (str) {
    let newStr = this.state.text + str
    return this.setState({text: newStr})
  }

  getResultWith (equation) {
    let equationWithAsterisk = equation.replace(/x/g, '*')
    let equationWithSpaces = equationWithAsterisk.replace(/\s*[()-+/*]\s*/g, ' $& ')
    let regexp = new RegExp('D([^\\s]*)', 'g')
    let equationWithRolledDice = equationWithSpaces.replace(regexp, function (match) {
      let max = Number(match.substring(1))
      let min = Math.ceil(1)
      max = Math.floor(max)
      let results = Math.floor(Math.random() * (max - min + 1)) + min
      let resultsString = String(results)
      return '(' + resultsString + ')'
    })
    let result = math.eval(equationWithRolledDice)
    if (isNaN(result)) {
      return result
    } else {
      return Math.round(result)
    }
  }

  toggleTextColor () {
    let newTextColor = this.state.isError ? 'white' : 'red'
    this.setState({isError: !this.state.isError, textColor: newTextColor})
  }

}

AppRegistry.registerComponent('DungeonDice', () => DungeonDice)
