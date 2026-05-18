import { plugin } from "bun";
plugin({
  name: "asset-stub",
  setup(build) {
    build.onResolve({ filter: /\.(png|jpg|jpeg|webp|svg|gif)(\?.*)?$/ }, (args) => ({
      path: "stubbed-asset",
      namespace: "asset-stub",
    }));
    build.onLoad({ filter: /.*/, namespace: "asset-stub" }, () => ({
      contents: 'export default "stub";',
      loader: "js",
    }));
  },
});
