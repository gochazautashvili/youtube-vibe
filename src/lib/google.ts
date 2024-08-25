import { Google } from "arctic";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const redirectURI = `${process.env.FRONTEND_URL}/api/google/webhook`;

const google = new Google(clientId!, clientSecret!, redirectURI);

export default google;
