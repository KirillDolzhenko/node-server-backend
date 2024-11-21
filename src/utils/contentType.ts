export default function extContentType(extname: string) {
  let contentType = "text/plain";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "application/javascript";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".gif":
      contentType = "image/gif";
      break;
    case ".jpg":
      contentType = "image/jpeg";
      break;
    case ".jpeg":
      contentType = "image/jpeg";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".html":
      contentType = "text/html";
      break;
  }

  return contentType;
}
