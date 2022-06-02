import { BlurView } from "@react-native-community/blur"
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, Text, StyleSheet, View, TouchableOpacity, Image, Alert } from "react-native"
import { useAppDispatch } from "../../app/hooks";
import { Card } from "../../models/Card"
import { deleteCard, duplicateCard, shareCard } from "./cardListSlice";

interface Props {
  card: Card;
}

export interface CardActionsModalRef {
  show: () => void;
  hide: () => void;
}

export const CardActionsModal = forwardRef<CardActionsModalRef, Props>(({ card }: Props, ref) => {
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useAppDispatch();

  useImperativeHandle(ref, () => ({
    show: () => setModalVisible(true),
    hide: () => setModalVisible(false)
  }));

  const handleShare = () => {
    dispatch(shareCard(card.id));
  }
  const handleDuplicate = async () => {
    await dispatch(duplicateCard(card.id));
    setModalVisible(false);
  }
  const handleDelete = () => {
    Alert.alert(
      "Confirm delete",
      "This will delete the Food Card permanently. Are you sure?",
      [
        {
          text: "Delete",
          onPress: () => {
            dispatch(deleteCard(card.id))
            setModalVisible(false);
          },
          style: "destructive"
        },
        {
          text: "Cancel",
          style: "default"
        },
      ]
    );
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}
    >
      <View style={styles.container}>
        <BlurView style={styles.blurView} blurType="light" />
        <View style={styles.cardItem}>
          <Text style={styles.cardTitle}>{card.name}</Text>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Image source={require('../../assets/close.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Text style={styles.actionButtonText}>Share</Text>
            <Image source={require('../../assets/share.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDuplicate}>
            <Text style={styles.actionButtonText}>Duplicate</Text>
            <Image source={require('../../assets/duplicate.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Text style={styles.actionButtonText}>Delete</Text>
            <Image source={require('../../assets/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  blurView: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  cardItem: {
    width: '100%',
    backgroundColor: 'white',
    marginVertical: 6,
    borderRadius: 6,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation: 4,
    overflow: 'visible'

  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 22,
    color: 'rgb(67, 67, 67)',
    fontFamily: 'ProximaNova-Bold'
  },
  actionButtons: {
    alignSelf: 'flex-end',
    paddingRight: 3
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  actionButtonText: {
    color: 'rgb(17, 183, 119)',
    fontSize: 15,
    fontFamily: 'ProximaNova-Semibold',
  }
});