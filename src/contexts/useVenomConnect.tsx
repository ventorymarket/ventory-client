import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/authentication";
import { RPC_NODE } from "@/constants/wallet";
import { setToken } from "@/service/api";
import { loginApi } from "@/service/authentication";
import { formatBalance } from "@/utils";
import { Address, ProviderRpcClient } from "everscale-inpage-provider";
import { EverscaleStandaloneClient } from "everscale-standalone-client";
import { createContext, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { VenomConnect } from "venom-connect";

export const targetNetworkIdTestnet = 1000;
export const targetNetworkIdMainnet = 1;
export const targetNetworkDevnet = 1002;

export const targetNetworkId = targetNetworkIdTestnet;

export const TokenDiceContractAddress = new Address(
  "0:19128985f2d034a0a7b8dad5b23946aff3e63fe68c13243feb58124cef9acbb6"
);
export const TokenRootContractAddress = new Address(
  "0:13d2105fbd7fb7665eb7845703e507b192557a4048c8d27fa8ee08828db76cb0"
);

const InitialState: {
  isInitializing: boolean;
  isConnected: boolean;
  account: any;
  provider: any;
  login: any;
  logout: any;
  balance: any;
  isAuthenticated: boolean;
} = {
  isInitializing: true,
  isConnected: false,
  account: undefined,
  provider: undefined,
  login: null,
  logout: null,
  balance: 0,
  isAuthenticated: false,
};

const initVenomConnect = async () => {
  return new VenomConnect({
    theme: "dark",
    checkNetworkId: [targetNetworkDevnet],
    providersOptions: {
      venomwallet: {
        walletWaysToConnect: [
          {
            package: ProviderRpcClient,
            packageOptions: {
              fallback:
                VenomConnect.getPromise("venomwallet", "extension") ||
                // eslint-disable-next-line prefer-promise-reject-errors
                (() => Promise.reject()),
              forceUseFallback: true,
            },
            packageOptionsStandalone: {
              fallback: () =>
                EverscaleStandaloneClient.create({
                  connection: {
                    id: targetNetworkId,
                    group: "venom_devnet",
                    type: "jrpc",
                    data: {
                      endpoint: RPC_NODE,
                    },
                  },
                }),
              forceUseFallback: true,
            },
            id: "extension",
            type: "extension",
          },
        ],
        defaultWalletWaysToConnect: ["mobile", "ios", "android"],
      },
    },
  });
};
export const VenomProviderContext = createContext(InitialState);
export function VenomProvider({ children }: { children: any }) {
  const [venomConnect, setVenomConnect] = useState<any>(undefined);
  const [provider, setProvider] = useState<any>(undefined);
  const [account, setAccount] = useState<any>(undefined);
  const [balance, setBalance] = useState<any>(undefined);
  // const [selectedNetworkId, setSelectedNetworkId] = useState(1000);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [, setCookie, removeCookie] = useCookies([ACCESS_TOKEN, REFRESH_TOKEN]);

  // Initializing
  useEffect(() => {
    const initPipeline = async () => {
      const venomConnect = await initVenomConnect();
      setVenomConnect(venomConnect);

      const provider = await venomConnect.checkAuth();
      setProvider(provider);
      setIsInitializing(false);
    };

    initPipeline().catch((err) => {
      console.log(`Venom provider init error`, err);
    });
  }, []);

  useEffect(
    function () {
      venomConnect &&
        venomConnect.on("connect", function (provider: any) {
          setProvider(provider);
         // window.provider = provider;
        });
    },
    [venomConnect]
  );

  useEffect(() => {
    const getBalance = async () => {
      if (account) {
        const response = await provider?.getBalance(account);
        setBalance(formatBalance(response));
      } else {
        setBalance(0);
      }
    };
    getBalance();
  }, [account, provider]);

  useEffect(
    function () {
      // to gracefully unsubscribe
      const promises: any[] = [];
      const subscribers: any[] = [];
      let stale = false;

      if (provider) {
        // subscribe to permissions changed
        const permissionsSubscriberPromise =
          provider.subscribe("permissionsChanged");
        promises.push(permissionsSubscriberPromise);
        permissionsSubscriberPromise.then(function (
          permissionsSubscriber: any
        ) {
          subscribers.push(permissionsSubscriber);
          permissionsSubscriber.on("data", (event: any) => {
            if (!stale)
              setAccount(
                event.permissions.accountInteraction?.address.toString()
              );
          });
        });

        // subscribe to networkId changed
        // const networkSubscriberPromise = provider.subscribe('networkChanged');
        // promises.push(networkSubscriberPromise);
        // networkSubscriberPromise.then(function(networkSubscriber) {
        //     subscribers.push(networkSubscriber);
        //     networkSubscriber.on('data', (event) => {
        //         if (!stale)
        //             setSelectedNetworkId(event.networkId);
        //     });
        // })

        // after successfully subscribe to changes
        Promise.all(promises).then(function () {
          provider
            .getProviderState()
            .then(function (currentProviderState: any) {
              if (!stale) {
                // setSelectedNetworkId(currentProviderState.networkId);
                setAccount(
                  currentProviderState.permissions.accountInteraction?.address.toString()
                );
              }
            });
        });

        return () => {
          stale = true;
          Promise.all(promises).then(function () {
            subscribers.forEach(function (subscribe) {
              subscribe.unsubscribe();
            });
          });
        };
      }
    },
    [provider]
  );

  useEffect(() => {
    const login = async () => {
      const res = await loginApi({ address: account });
      if (res?.data?.token) {
        setIsAuthenticated(true);
        setCookie(ACCESS_TOKEN, res.data.token);
        setCookie(REFRESH_TOKEN, res.data.refreshToken);
        setToken(res.data.token);
      }
    };
    if (account) login();
  }, [account]);

  const login = useCallback(async () => {
    try {
      await venomConnect.connect();
    } catch (e) {
      console.log("Connecting error", e);
    }
  }, [venomConnect, provider]);

  const logout = useCallback(async () => {
    await venomConnect.disconnect();
    setAccount(undefined);
    setIsAuthenticated(false);
    removeCookie(ACCESS_TOKEN);
    removeCookie(REFRESH_TOKEN);
  }, [venomConnect]);

  return (
    <VenomProviderContext.Provider
      value={{
        isInitializing,
        isConnected: !isInitializing && !!account,
        account,
        provider,
        login,
        logout,
        balance,
        isAuthenticated,
      }}
    >
      {children}
    </VenomProviderContext.Provider>
  );
}
