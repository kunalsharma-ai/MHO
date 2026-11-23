import { CrudController } from "../utils/index.js";
import { Profile as profileModel } from "../model/index.js";
import mongoose from "mongoose";

class ProfileController extends CrudController {
  async status() {
    const userId = this?.request?.user?._id?.toString();
    const origin = this?.request?.origin;

    
    const filter = { isActive: true, isDeleted: false };
    if (origin) filter.origin = origin;

    const profiles = await profileModel.find(filter).lean();
    if (!profiles.length) return {};

    const questionNamesByProfile = {};
    const allQuestionNames = new Set();

    profiles.forEach((profile) => {
      const names = (profile.pages || []).reduce(
        (acc, page) => acc.concat(page.slice(1)),
        []
      );
      questionNamesByProfile[profile.slug] = [...new Set(names)];
      names.forEach((n) => allQuestionNames.add(n));
    });

    const allNamesArr = [...allQuestionNames];

    const QuestionModel = mongoose.model("Question");
    const OptionModel = mongoose.model("Option");
    // No "Validation" model is defined in this codebase; without this guard every POST /api/v1/profile failed with
    // "Schema hasn't been registered for model Validation". When the model exists, its parent values are used as before.
    const ValidationModel = mongoose.modelNames().includes("Validation") ? mongoose.model("Validation") : null;
    const AnswerModel = mongoose.model("Answer");

    const [questionDefs, optionDocs, validationDocs, userAnswers] = await Promise.all([
      QuestionModel.find({ name: { $in: allNamesArr } }).select("_id name parent").lean(),
      OptionModel.find({ question: { $in: allNamesArr } }).select("question parentValue").lean(),
      ValidationModel ? ValidationModel.find({ question: { $in: allNamesArr } }).select("question parentValue").lean() : [],
      AnswerModel.find({ user: userId, question: { $in: allNamesArr } }).select("question answer").lean(),
    ]);

    
    const triggersByQName = {};
    const addTriggers = (docs) => {
      docs.forEach((doc) => {
        const values = Array.isArray(doc.parentValue) ? doc.parentValue : [doc.parentValue];
        if (!triggersByQName[doc.question]) triggersByQName[doc.question] = new Set();
        values.forEach((v) => {
          if (v && v !== "-") triggersByQName[doc.question].add(v);
        });
      });
    };
    addTriggers(optionDocs);
    addTriggers(validationDocs);

    const qByName = {};
    questionDefs.forEach((q) => {
      qByName[q.name] = q;
    });

    const answerByName = {};
    userAnswers.forEach((a) => {
      answerByName[a.question] = Array.isArray(a.answer) ? a.answer[0] : a.answer;
    });

    
    const currentUser = this.request.user;
    if (currentUser?.fullname || currentUser?.name) {
      answerByName.fullname = currentUser.fullname || currentUser.name;
    }
    if (currentUser?.email || currentUser?.mail) {
      answerByName.mail = currentUser.email || currentUser.mail;
    }

    const applicableCache = {};

    function isApplicable(name, visiting) {
      if (name in applicableCache) return applicableCache[name];

      const question = qByName[name];
      if (!question) return (applicableCache[name] = false);
      if (!question.parent) return (applicableCache[name] = true);
      if (visiting.has(name)) return (applicableCache[name] = false);

      visiting.add(name);

      if (!isApplicable(question.parent, visiting)) {
        return (applicableCache[name] = false);
      }

      const parentAnswer = answerByName[question.parent];
      if (parentAnswer === undefined) {
        return (applicableCache[name] = false);
      }

      const triggers = triggersByQName[name] ? [...triggersByQName[name]] : [];
      const result =
        triggers.length === 0
          ? true
          : triggers.some(
              (t) => String(t).toLowerCase() === String(parentAnswer).toLowerCase()
            );

      return (applicableCache[name] = result);
    }

    const result = {};

    profiles.forEach((profile) => {
      const names = questionNamesByProfile[profile.slug];
      let totalApplicable = 0;
      let totalFilled = 0;

      names.forEach((name) => {
        if (!qByName[name]) return;
        if (!isApplicable(name, new Set())) return;

        totalApplicable += 1;
        const value = answerByName[name];
        if (value !== undefined && value !== null && value !== "") {
          totalFilled += 1;
        }
      });

      result[profile.slug] =
        totalApplicable === 0 ? 0 : Math.round((totalFilled / totalApplicable) * 100);
    });

    return result;
  }
}

export default new ProfileController(profileModel);