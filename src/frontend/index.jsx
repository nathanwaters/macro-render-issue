import React, { useEffect } from "react";
import ForgeReconciler, {
  Label,
  useContentProperty,
  Text,
  Textfield,
  CheckboxGroup,
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
      <Label labelFor="prompt">2. Enter anything here...</Label>
      <Textfield id="prompt" name="prompt" />
      {hasFields && (
        <>
          <CheckboxGroup
            name="toggle"
            options={[
              {
                value: "toggle",
                label: "4. User needs to toggle this to update prefilled value",
              },
            ]}
          />
          <Label labelFor="dynamic">
            3. Dynamic Field with prefilled value
          </Label>
          <Textfield
            id="dynamic"
            name="dynamic"
            placeholder="Text..."
            defaultValue="Default Value" // I'd like to see this update live
          />
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
      {dynamicField && (
        <Text>
          5. Dynamic defaultValue value should update live: {dynamicField}
        </Text>
      )}
    </>
  );
};

ForgeReconciler.render(<App />);
ForgeReconciler.addConfig(<Config />);
