const OpenAI = require("openai");
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

class OpenAIController {
  static async generateImage(req, res, next) {
    try {
      const { prompt } = req.body;

      if (!prompt) throw new Error("INVALID_PROMPT");

      const aiResponse = await openai.images.generate({
        prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json",
      });

      const image = aiResponse.data[0].b64_json;

      res.status(200).json({
        image,
      });
    } catch (error) {
      console.log(error);
      let status = 500;
      let message = "Internal Server Error";

      if (error.message === "INVALID_PROMPT") {
        status = 400;
        message = "Please input a prompt";
      }

      if (error.code === "content_policy_violation") {
        status = 400;
        message =
          "Prompt contain text that is not allowed by our safety system.";
      }

      res.status(status).json({
        message,
      });
    }
  }
}

module.exports = OpenAIController;
