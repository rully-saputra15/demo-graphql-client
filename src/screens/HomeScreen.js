import {
  View,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import { gql, useQuery } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      description
      price
      title
    }
  }
`;

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_BOOKS);
  console.log(loading, error, data);
  if (loading) return <Loading />;
  if (error) return <Text>Error..</Text>;
  return (
    <SafeAreaView>
      <View>
        <Button
          title="New Book"
          onPress={() => {
            navigation.navigate("newBookScreen");
          }}
        />
        <View style={style.container}>
          {data?.books?.map((book) => (
            <Pressable
              style={style.card}
              key={book.id}
              onPress={() =>
                navigation.navigate("bookDetail", {
                  id: book.id,
                })
              }
            >
              <Text style={{ color: "#F8F7F3" }}>{book.title}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 2,
    marginHorizontal: 2,
  },
  card: {
    padding: 10,
    backgroundColor: "#36454f",
    color: "#F8F7F3",
    borderRadius: 10,
    width: "30%",
    height: "30%",
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowColor: "black",
  },
});
