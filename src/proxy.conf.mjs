export default [
  {
    context: ["/api"],
    //target: "http://127.0.0.1:8080",
    target: "http://localhost:8080",
    secure: false,
    pathRewrite: { api: "" },
    logLevel: "debug",
  },
];
