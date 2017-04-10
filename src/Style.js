/**
 * Style.js
 *
 * Created by kylewbanks on 2016-08-07.
 */
'use strict'

import React, { Component } from 'react'
import { StyleSheet } from 'react-native'

var Style = StyleSheet.create({
  rootContainer: {
    flex: 1
  },

  displayContainer: {
    flex: 3,
    backgroundColor: '#10262f',
    justifyContent: 'center'
  },

  displayText: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'right',
    padding: 10,
    fontFamily: 'Menlo'
  },

  inputContainer: {
    flex: 16,
    flexDirection: 'row',
    backgroundColor: 'grey'
  },

  buttonsContainer: {
    flex: 8
  },

  inputButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#343434',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: -3
    },
    margin: 8
  },

  inputButtonHighlighted: {
    // backgroundColor: '#272727'
  },

  inputButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Menlo'
  },

  diceButton: {
    backgroundColor: '#73eaea'
  },

  diceButtonHighlighted: {
    // backgroundColor: '#5a5a5a'
  },

  diceButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#343434',
    fontFamily: 'Menlo'
  },

  deleteButton: {
    flex: 1,
    backgroundColor: '#d7311d'
  },

  deleteButtonHighlighted: {
    // backgroundColor: '#9a0000'
  },

  deleteButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Menlo'
  },

  rollButton: {
    flex: 2,
    backgroundColor: '#73eaea'
  },

  rollButtonHighlighted: {
    backgroundColor: 'black'
  },

  rollButtonText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#343434',
    fontFamily: 'Menlo'
  },

  operatorButton: {
    // backgroundColor: 'blue'
  },

  operatorButtonHighlighted: {
    // backgroundColor: 'black'
  },

  operatorButtonText: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#73eaea',
    fontFamily: 'Menlo'
  },

  inputRow: {
    flex: 1,
    flexDirection: 'row'
  }
})

export default Style
