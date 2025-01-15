import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("dummyFetch", (req) => {
  return [
    {
      foo: "bar",
    },
  ];
});

export const handler = resolver.getDefinitions();
