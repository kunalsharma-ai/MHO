import express from "express";
import { Response as responseController, Survey as surveyController } from "../../controller/index.js";
import { Mutate, expressRoute, expressView, isAuthenticated, fsLogger } from "../../../utils/index.js"
import { requireAdmin, requireMember } from "../../../utils/access.js";
// Reading surveys is public. Creating, changing and deleting them, and the response lists, are for admins only.

const router = express.Router();
router
    .route('/')
    .get(expressRoute(
        async req => {
            // Read all entries
            let message = "";
            let data = await surveyController.list()
            return { message, data };
        },
        surveyController
    ))
    .post(isAuthenticated, expressRoute(
        async req => {
            let message = "";
            let data = Mutate(await surveyController.list(req.body))
            return { message, data }
        },
        surveyController
    ))
    .put(requireAdmin, expressRoute(
        async req => {
            // Create new entry
            let message = "Survey created";
            let data = await surveyController.create(req.body);
            return { message, data };
        },
        surveyController
    ))
router
    .route("/responses/:slug")
    .get(requireAdmin, expressRoute(
        async req => {
            let data = await responseController.list({
                "survey.slug":req.params.slug
            })
            return { message: "", data }
        },
        responseController
    ))
router.post(
    "/responses",
    requireAdmin,
    expressRoute(
        async req => {
            let data = await responseController.listResponses({
                ...req.body
            })
            return { message: "", data }
        },
        responseController
    )
)
router
    .route('/:id')
    .get(expressRoute(
        async req => {
            // read single entry
            let message = "";
            let data = await surveyController.read(req.params.id);
            return { message, data };
        },
        surveyController
    ))
    .put(requireAdmin, expressRoute(
        async req => {
            // update single entry
            let message = "Survey updated";
            let data = await surveyController.update(req.params.id, req.body)
            return { message, data };
        },
        surveyController
    ))
    .delete(requireAdmin, expressRoute(
        async req => {
            // delete single entry
            let message = "Survey Deleted";
            let data = await surveyController.delete(req.params.id)
            return { message, data };
        },
        surveyController
    ))
export default router;