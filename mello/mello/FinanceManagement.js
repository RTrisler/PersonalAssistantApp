import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { PlaidLink, LinkSuccess, LinkExit } from 'react-native-plaid-link-sdk'

export default function FinanceManagement() {
  return (
    <View style={styles.container}>
      <PlaidLink
        tokenConfig={{ token: '#GENERATED_LINK_TOKEN#', noLoadingState: false }}
        onSuccess={(success) => console.log(success)}
        onExit={(exit) => console.log(exit)}
      >
        <Text>Add Account</Text>
      </PlaidLink>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})