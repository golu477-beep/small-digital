import publicContentHandler from '../src/pages/api/content.js';

function normalizeRequest(request) {
  if (!request.originalUrl) {
    request.originalUrl = request.url;
  }

  if (!request.path) {
    const url = new URL(request.url || '/', `https://${request.headers?.host || 'localhost'}`);
    request.path = url.pathname;
    request.query = Object.fromEntries(url.searchParams.entries());
  }
}

export default async function handler(request, response) {
  normalizeRequest(request);
  return publicContentHandler(request, response);
}
