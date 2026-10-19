"use client";

import { AppStore, createStore, preloadedState } from "@/store/store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useRef, type ReactNode } from "react";
import { Provider } from "react-redux";

export default function Providers({ children,preloadedState }: { children: ReactNode , preloadedState:preloadedState }) {

    const myClient = new QueryClient()
  

    const storeRef =useRef<AppStore|null>(null)

    if(storeRef.current==null)
    {
      storeRef.current= createStore(preloadedState);
    }
  return (
    <Provider store={storeRef.current}>
      <QueryClientProvider client={myClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </Provider>
  );
 
}