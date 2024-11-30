import { ConnectionMode, CosmosClient } from "@azure/cosmos";

const cosmosClient = new CosmosClient({
    endpoint: process.env.COSMOSDBURL as string,
    key: process.env.COSMOSDBKEY as string,
    connectionPolicy: {
        connectionMode: ConnectionMode.Gateway
    }
})

export default cosmosClient.database(process.env.COSMOSDBDB as string)