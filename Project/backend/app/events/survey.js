import { eventStream, fsLogger } from "../../utils/index.js";

eventStream.onEvent("survey-internal-started", (data) => {
    fsLogger.Log(`Internal Survey Started by User`,data)
})

eventStream.onEvent("survey-internal-completed", (data) => {
    fsLogger.Log(`Internal Survey Completed by User`,data)
})


