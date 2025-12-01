import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import HairbasiczRoutes from "./routes/index";
import ContextProviders from "./contexts/ContextProviders";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <ContextProviders>
        <QueryClientProvider client={queryClient}>
          <HairbasiczRoutes />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ContextProviders>
    </ChakraProvider>
  );
}

export default App;
