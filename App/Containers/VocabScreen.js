import React from 'react';
import { View, Text, Picker } from 'react-native';
import RoundedButton from '../Components/RoundedButton';
import vocab from '../../GreekAppData/vocab.json';

// Styles
import styles from './Styles/VocabScreenStyles'


export default class VocabScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flip: true,
      deckPosition: 0,
    };
    this.flipCard = this.flipCard.bind(this);
    this.correct = this.correct.bind(this);
    this.wrong = this.wrong.bind(this);
    this.showCard = this.showCard.bind(this);
  }

  // Get unit selected from UnitSelectScreen
  componentWillMount() {
    this.setState({
      deck: vocab[this.props.navigation.state.params.selectedChapter],
    })
  }

  flipCard() {
    this.setState({
      flip: !this.state.flip,
    });
  }

  correct() {
    const { deckPosition, deck, flip } = this.state;
    deck.splice(deck, 1)
    this.setState({
      flip: !flip,
      deck: deck,
    });
  }

  wrong() {
    const { deckPosition, deck, flip } = this.state;
    const reset = deckPosition + 1 < deck.length;

    this.setState({
      flip: !flip,
      deckPosition: reset ? deckPosition + 1 : 0
    });
  }

  showCard() {
    const { flip, deck, deckPosition } = this.state;
    const finished = deck.length < 1
    if (!finished) {
      return deck[deckPosition][flip ? 'greek' : 'english']
    }

    return "Great job!"
  }


  render() {

    // Debugging statements:
    console.log('Deck: ', this.state.deck)
    console.log('Flip state: ', this.state.flip)
    console.log('Deck Position', this.state.deckPosition)

    const { flip, deck, deckPosition } = this.state;

    let finished = deck.length < 1

    return(
      <View style={styles.mainContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>{this.showCard()}</Text>
        </View>
        { finished ? <View/> :
        <View>
          {flip ?
          <View style={styles.buttonContainer} >
            <RoundedButton 
              text="flip"
              onPress={this.flipCard}
            />
          </View>
          :
          <View style={styles.buttonContainer}>
            <RoundedButton 
              text="✔️" 
              onPress={this.correct}
            />
            <RoundedButton 
              text="❌"
              onPress={this.wrong}
            />
          </View>
          }
         </View>
        }
      </View>
    )
  }
}
