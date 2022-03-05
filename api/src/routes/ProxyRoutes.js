var express = require("express");
var router = express.Router();
const { createProxyMiddleware } = require("http-proxy-middleware");

// Proxy endpoints
router.use(
  "/gl_fbs",
  createProxyMiddleware({
    target: "https://firebasestorage.googleapis.com/",
    changeOrigin: true, // needed for virtual hosted sites
    ws: false, // proxy websockets
    logLevel: "debug",
    onProxyRes: (proxyRes, req, res) => {},
    pathRewrite: async function (path, req) {
      let base = "v0/b/prodev-react-blog.appspot.com/o/";
      let pathes = path.split(base);
      console.log(pathes);
      if (pathes.length > 1) {
        return base + pathes[1].replace(/\//g, "%2F");
      }
      return path.replace("/api/proxy/gl_fbs", "");
    },
  })
);

module.exports = router;
