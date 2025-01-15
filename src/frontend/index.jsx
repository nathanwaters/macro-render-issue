import React, { useEffect } from "react";
import ForgeReconciler, {
  Label,
  useContentProperty,
  Text,
  Textfield,
  useConfig,
} from "@forge/react";
import { invoke } from "@forge/bridge";

const Config = () => {
  const config = useConfig();
  const prompt = config?.prompt;

  const [fields, setFields] = useContentProperty("fields", []);
  const hasFields = fields?.length > 0;

  useEffect(() => {
    if (!prompt) return;
    const fetchData = async () => {
      const result = await invoke("dummyFetch", { prompt });
      if (result) await setFields(result);
    };
    fetchData();
  }, [prompt]);

  return (
    <>
      <Textfield id="prompt" name="prompt" />
      {hasFields && (
        <>
          <Label labelFor="issue">Updating this will re-render</Label>
          <Textfield id="issue" name="issue" placeholder="Text..." />
        </>
      )}
    </>
  );
};

const App = () => (
  <>
    <Text>Edit this</Text>
  </>
);

ForgeReconciler.render(<App />);
ForgeReconciler.addConfig(<Config />);
