import { Pressable, Text, View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery, gql } from "@apollo/client";
import Loading from "../components/Loading";

const GET_BOOK_BY_ID = gql`
  query BookById($id: ID!) {
    bookById(id: $id) {
      id
      description
      price
      title
    }
  }
`;
export default function BookDetailScreen({ route, navigation }) {
  const { id } = route.params;
  const { loading, error, data } = useQuery(GET_BOOK_BY_ID, {
    variables: {
      id: id,
    },
  });
  console.log(data);
  if (loading) return <Loading />;
  if (error) return <Text>Error</Text>;

  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => navigation.goBack()}>
          <Text>back</Text>
        </Pressable>
        <View style={style.container}>
          <Image
            style={style.image}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            }}
          />
          <Text style={style.title}>{data.bookById.title}</Text>
          <Text>Description: {data.bookById.description}</Text>
          <Text>Price: {data.bookById.price}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "4px",
    marginTop: "10%",
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  image: {
    width: "100%",
    height: 300,
  },
});
