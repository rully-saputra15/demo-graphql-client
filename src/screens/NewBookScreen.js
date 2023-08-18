import { useState } from "react";
import { Button, TextInput, StyleSheet, Pressable, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useMutation } from "@apollo/client";

const CREATE_BOOK = gql`
  mutation Mutation($newBook: BookParams) {
    addBook(newBook: $newBook) {
      id
      description
      price
      title
    }
  }
`;

export default function NewBookScreen({ navigation }) {
  const [createBook, { data, loading, error }] = useMutation(CREATE_BOOK, {
    refetchQueries: ["GetBooks"],
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = async () => {
    const newBook = {
      id: Math.ceil(Math.random() * 10000),
      title: title,
      description: description,
      price: +price,
    };
    await createBook({
      variables: {
        newBook,
      },
    });
    navigation.navigate("home");
  };

  return (
    <SafeAreaView>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </Pressable>
      <TextInput
        style={style.input}
        value={title}
        placeholder="title"
        onChangeText={setTitle}
      />
      <TextInput
        style={style.input}
        value={description}
        placeholder="description"
        onChangeText={setDescription}
      />
      <TextInput
        style={style.input}
        value={price}
        placeholder="price"
        onChangeText={setPrice}
      />
      <Button
        title={loading ? "Loading..." : "submit"}
        onPress={handleSubmit}
      />
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
