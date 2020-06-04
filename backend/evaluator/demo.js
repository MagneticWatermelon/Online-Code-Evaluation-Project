const evaluator = require("./evaluator");
const Bundle = require("./bundle");
const templates = require("./template");

async function demo(jsonBundle) {
  console.log(`starting remote execution test for ${jsonBundle.lang}`);

  let start = Date.now();
  let { lang, files, inputs, outputs } = jsonBundle;
  let bundle = new Bundle(lang, inputs, outputs);
  bundle.addAll(files);

  evaluator.evaluate(
    `demo${Math.random()}`,
    bundle,
    (err, score, evaluation) => {
      if (err) {
        return console.log(err);
      }

      console.log(`score is ${score}`);

      for (e of evaluation) {
        console.log(e);
      }
      let duration = (Date.now() - start) / 1000;

      console.log("it took " + duration + " seconds");
    }
  );
}

demo(templates.cTemplate);
demo(templates.cppTemplate);
demo(templates.javaTemplate);
demo(templates.pythonTemplate);
demo(templates.jsTemplate);
