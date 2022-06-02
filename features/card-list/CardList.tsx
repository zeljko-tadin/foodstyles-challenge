import { ScrollView, StyleSheet } from "react-native"
import { Card } from "../../models/Card";
import { CardListItem } from "./CardListItem";

interface Props {
  cards: Card[]
}

export const CardList = ({ cards }: Props) => {
  return (
    <ScrollView style={styles.container}>
      {cards.map(card => <CardListItem key={card.id} card={card} />)}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})