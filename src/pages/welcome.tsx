import type { NextPage } from 'next'
import Head from 'next/head'
import NewSafe from '@/components/welcome/NewSafe'

import { useDispatch } from 'react-redux';
import { chainsWrapperSlice } from '@/store/chainsSlice'

const Welcome: NextPage = () => {
  const dispatch = useDispatch();

  const addNewChain = () => {
    console.log('Adding new chain');
    const newChain = {
      transactionService: "https://your-transaction-service-url/",
      chainId: "4", // Unique chain ID
      chainName: "New Chain",
      shortName: "nch",
      l2: false,
      description: "Description of the new chain",
      rpcUri: {
        authentication: "API_KEY_PATH",
        value: "https://your-rpc-uri/",
      },
      safeAppsRpcUri: {
        authentication: "API_KEY_PATH",
        value: "https://your-safe-apps-rpc-uri/",
      },
      publicRpcUri: {
        authentication: "API_KEY_PATH",
        value: "https://your-public-rpc-uri/",
      },
      blockExplorerUriTemplate: {
        address: "https://your-block-explorer-url/address/{{address}}",
        txHash: "https://your-block-explorer-url/tx/{{txHash}}",
        api: "https://your-block-explorer-api-url/api?module={{module}}&action={{action}}&address={{address}}&apiKey={{apiKey}}",
      },
      nativeCurrency: {
        name: "NewChain Token",
        symbol: "NCT",
        decimals: 18,
        logoUri: "https://your-token-logo-url/",
      },
      theme: {
        textColor: "#001428",
        backgroundColor: "#DDDDDD",
        ensRegistryAddress: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
      },
      gasPrice: [
        {
          type: "ORACLE",
          uri: "https://your-gas-price-uri/",
          gasParameter: "FastGasPrice",
          gweiFactor: "1000000000.000000000",
        },
      ],
      disabledWallets: [],
      features: [
        "CONTRACT_INTERACTION",
        // Add other features as needed
      ],
    };    

    dispatch(chainsWrapperSlice.actions.addChain({ pin: 5, chain: newChain }));
  }

  return (
    <>
      <Head>
        <title>{'Safe{Wallet} – Welcome'}</title>
      </Head>
      <button onClick={addNewChain} style={{margin: '1rem'}}>addNewChain</button>
      <NewSafe />
    </>
  )
}

export default Welcome
