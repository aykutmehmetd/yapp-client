import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { FlatList, ScrollView, TextInput } from "react-native-gesture-handler";
import { useState } from "react";
import axios from "axios";
import { TestType } from "@/types/test.types";
import React from "react";

const data1 = [
  { label: "İlkokul", value: "1" },
  { label: "Ortaokul", value: "2" },
  { label: "Lise", value: "3" },
  { label: "Lisans", value: "4" },
];

const data2 = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
];

export default function Page() {
  const [input, setInput] = useState("");
  const [data, setData] = useState<TestType[]>();
  const [isAnswered, setIsAnswered] = useState(false);
  const [isloading, setIsLoading] = useState(false)

  let req = async () => {
    try {
      let res = await axios.get(`http://192.168.1.7:3000/api/soru-sor?soru=${input}&type=4`);
      
      try {
        const result = JSON.parse(res.data.cevap)
        console.log(result)
        setData(result)
        setIsAnswered(true);
        setIsLoading(false)
      } catch (error) {
        console.error(error)
      }

    } catch (error) {
        console.error(error);

    }

  }

  return (
    //TODO soru sayisi secme, konu secme
    <View style={styles.main}>
      {/* <DropdownComponent title="Eğitim Seviyesi" data={data1} /> */}
      {/* <DropdownComponent title="Sınıf" data={data2} /> */}
      <View style={{alignItems:'center', justifyContent:'flex-end', padding:20}}>

        {!isAnswered &&
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.input}
              placeholder="Organik kimya, Rasyonel Sayılar ..."
              placeholderTextColor={"gray"}
              onChangeText={setInput}
            />

            <Pressable style={styles.button} onPress={() => {req(); setIsLoading(true); setIsAnswered(true)}}>
              <Text style={{color:"white", fontWeight:"bold",fontSize:16}}>Oluştur</Text>
            </Pressable>
          </View>
        }
        {isloading && <View><ActivityIndicator size={60}/></View>}

        <FlatList
          data={data}
          renderItem={({item, index}) => (
            <View style={{alignItems:'flex-start',}}>
              <Text style={{marginBottom:20}}>{index+1}- {item.soru}</Text>
              
              {
                item.secenekler.map((secenek, index) => (
                  <Text key={index} style={{padding:5, marginBottom:5, borderWidth:0.3, borderRadius:5}}>{secenek}</Text>
                ))
              }
              
            </View>
          )}
          contentContainerStyle={{alignItems:"flex-start", gap:30,}}
          //columnWrapperStyle={{gap:30}}
          style={{}}

        />
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap:15
  },
  input: {
    width: "65%",
    height: 50,
    borderRadius: 30,
    padding: 10,
    paddingLeft: 15,
    borderWidth: 2,
    borderColor: "#5781ea",
  },
  button: {
    width: 100,
    minHeight: 35,
    padding:5,
    marginTop:"30%",
    backgroundColor:"#5781ea",
    borderRadius:10,
    alignItems:"center",
    justifyContent:"center",
    
  }
});
