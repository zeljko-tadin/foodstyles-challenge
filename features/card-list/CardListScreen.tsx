import { useCallback, useEffect } from "react";
import { Image, TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Container } from "../../components/Container"
import { CardList } from "./CardList"
import { selectCards, fetchCards, createCard } from "./cardListSlice";

export const CardListScreen = () => {
  const dispatch = useAppDispatch();
  const cards = useAppSelector(selectCards);
  const insets = useSafeAreaInsets();

  const addCard = useCallback(() => dispatch(createCard()), [dispatch]);

  useEffect(() => {
    dispatch(fetchCards());
  }, []);

  return (
    <Container>
      <CardList cards={cards} />
      <TouchableOpacity style={styles.addButton} onPress={() => addCard()}>
        <Image source={require('../../assets/add.png')} />
        <Text style={styles.addButtonText}>New Food Style</Text>
      </TouchableOpacity>
      <View style={{ ...styles.footer, height: 40 + insets.bottom, bottom: -insets.bottom}} />
    </Container>
  )
}

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 4,
    zIndex: 1,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
    position: 'absolute',
    bottom: 10,
    left: 18,
    right: 18,
    zIndex: 999
  },
  addButtonText: {
    fontFamily: 'ProximaNova-Bold',
    fontSize: 18,
    color: 'rgb(67, 67, 67)',
  }
});