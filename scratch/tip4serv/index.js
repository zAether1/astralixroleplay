/**
 * Tip4Serv Integration Module
 * 
 * Entry point for the Tip4Serv API integration layer.
 * Exports the client, normalizer, and a factory function.
 */

const Tip4ServClient = require('./client');
const normalizer = require('./normalizer');

/**
 * Create a configured Tip4Serv client instance
 */
function createClient() {
  const apiKey = process.env.TIP4SERV_API_KEY;
  const storeId = process.env.TIP4SERV_STORE_ID;

  if (!apiKey) {
    console.warn('[Tip4Serv] WARNING: TIP4SERV_API_KEY not set. API calls requiring auth will fail.');
  }
  if (!storeId) {
    console.warn('[Tip4Serv] WARNING: TIP4SERV_STORE_ID not set. Checkout will not work.');
  }

  return new Tip4ServClient(apiKey, storeId);
}

module.exports = {
  Tip4ServClient,
  createClient,
  normalizer,
};
