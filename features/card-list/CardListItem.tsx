import { useRef } from "react"
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Card } from "../../models/Card"
import { CardActionsModal, CardActionsModalRef } from "./CardActionsModal"

interface Props {
  card: Card
}

export const CardListItem = ({ card }: Props) => {

  const modalRef = useRef<CardActionsModalRef>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{card.name}</Text>
      <TouchableOpacity onPress={() => modalRef.current?.show()}>
        <Image source={require('../../assets/options.png')} />
      </TouchableOpacity>
      <CardActionsModal card={card} ref={modalRef} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginVertical: 6,
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
    marginHorizontal: 18,
    overflow: 'visible'

  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: 'rgb(67, 67, 67)',
    fontFamily: 'ProximaNova-Bold'
  }
});