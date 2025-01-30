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
      <Label labelFor="prompt">Enter anything here...</Label>
      <Textfield id="prompt" name="prompt" />
      {hasFields && (
        <>
          <Label labelFor="dynamic">
            This renders a dynamic field, update value to see re-render flicker
            issue...
          </Label>
          <Textfield id="dynamic" name="dynamic" placeholder="Text..." />
        </>
      )}
    </>
  );
};

const App = () => {
  const config = useConfig();
  const dynamicField = config?.dynamic;

  return (
    <>
      <Text>1. Edit this macro</Text>
      <Text>2. Dynamic field value should update live: {dynamicField}</Text>
    </>
  );
};

ForgeReconciler.render(<App />);
ForgeReconciler.addConfig(<Config />);
