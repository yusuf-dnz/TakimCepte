import { useState, useEffect } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { StyleSheet, Text, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { auth, db } from "../firebase";
import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { ThemeContext } from "../Theme";

export default function SignUp({ navigation, route }) {
  const Theme = useContext(ThemeContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordIcon, setPasswordIcon] = useState("eye");


  const togglePasswordVisibility = () => {
    if (!showPassword) setPasswordIcon("eye-off");
    else setPasswordIcon("eye");
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (password != rePassword) {
      console.warn("şifre eşleşmedi kontrol et");
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        console.log(error);
      }
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Theme.backgroundColor,
      paddingHorizontal: 20,
    },

    view: {
      marginTop: "50%",
    },

    input: {
      backgroundColor: "transparent",
      marginVertical: 10,
    },
  });

  return (
    <View style={styles.container}>
      <SafeAreaProvider>
        <View style={styles.view}>
          <TextInput
            style={styles.input}
            label={<Text style={{ color: Theme.color }}>Email</Text>}
            value={email}
            textColor={Theme.color}
            underlineColor={Theme.color}
            activeUnderlineColor={Theme.color}
            onChangeText={(text) => setEmail(text)}
          />

          <TextInput
            style={styles.input}
            textColor={Theme.color}
            activeUnderlineColor={Theme.color}
            underlineColor={Theme.color}
            label={<Text style={{ color: Theme.color }}>Password</Text>}
            secureTextEntry={!showPassword}
            onChangeText={(text) => setPassword(text)}
            value={password}
          />

          <TextInput
            style={styles.input}
            textColor={Theme.color}
            activeUnderlineColor={Theme.color}
            underlineColor={Theme.color}
            label={
              <Text style={{ color: Theme.color }}>Repeat the password</Text>
            }
            value={rePassword}
            onChangeText={(text) => setRepeatPassword(text)}
            secureTextEntry={!showPassword}
            error={!passwordMatch}
            right={
              <TextInput.Icon
                id="password-icon"
                icon={passwordIcon}
                color={Theme.color}
                onPress={togglePasswordVisibility}
              />
            }
          />

          <Button
            style={{
              marginTop: 20,
              backgroundColor: "#0000ff44",
              borderRadius: 5,
            }}
            mode="contained-tonal"
            onPress={() => {
              handleSignUp();
            }}
          >
            <Text style={{ color: Theme.color }}>Kayıt Ol</Text>
          </Button>

          <Button
            rippleColor="#0000ff44"
            style={{
              marginTop: 10,
              alignItems: "flex-end",
            }}
            onPress={() => navigation.navigate("LogIn")}
          >
            <Text style={{ color: Theme.color }}>Giriş Yap</Text>
          </Button>
        </View>
      </SafeAreaProvider>
    </View>
  );
}
