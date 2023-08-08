import { Tspec } from "./src/types/tspec";
import { generateTspec } from "./src/generator";

const apiDocumentOptions: Tspec.GenerateParams = {
  specPathGlobs: ["./schema.ts"],
  tsconfigPath: "./tsconfig.json",
  outputPath: "./generate/openapi.json",
  specVersion: 3,
  openapi: {
    title: "Mr.C API",
    version: "1.0.0",
    securityDefinitions: {
      jwt: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  debug: true,
  ignoreErrors: false,
};

/** @mediaType application/json */
interface HealthRequest {
  message?: string;
}

type HealthApiSpec = Tspec.DefineApiSpec<{
  basePath: "/healthz";
  tags: ["Health Checks"];
  paths: {
    "/liveness": {
      get: {
        summary: "Check for liveness";
        body: HealthRequest;
        responses: {
          200: {};
        };
      };
    };
  };
}>;

await generateTspec(apiDocumentOptions);
