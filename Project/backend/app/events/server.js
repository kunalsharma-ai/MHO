import { eventStream, fsLogger } from "../../utils/index.js";

eventStream.onEvent("server-started", (data) => {
    fsLogger.Log(`Server started at port ${data.port}`)
})

eventStream.onEvent("server-fallback", (data) => {
    fsLogger.Log("Fallback route", data)
})

