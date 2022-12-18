import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Controller } from "react-hook-form";

const AuthInput = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={""}
      rules={rules}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[
              styles.input,
              {
                borderColor: error ? "red" : "black",
                borderWidth: error ? 1 : 0,
              },
            ]}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
          />
          {error && (
            <Text style={styles.errorText}>{error.message || "Error"}</Text>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  errorText: {
    color: "red",
  },
});

export default AuthInput;
