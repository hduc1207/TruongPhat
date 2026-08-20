"use client";

import { Amplify } from "aws-amplify";

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: "ap-southeast-1_vUxgZPCdU",
      userPoolClientId: "1n00iku2aqmicd0ctuq51ijk7b",
      loginWith: {
        oauth: {
          domain: "ap-southeast-1vuxgzpcdu.auth.ap-southeast-1.amazoncognito.com",
          scopes: ["email", "openid"],
          redirectSignIn: ["https://d2gsjrw8qdxah8.cloudfront.net/auth/callback.html", "http://localhost:3001/auth/callback", "http://localhost:3000/auth/callback"],
          redirectSignOut: ["https://d2gsjrw8qdxah8.cloudfront.net/", "http://localhost:3001/", "http://localhost:3000/"],
          responseType: "code",
        },
      },
    },
  },
});

export default function AmplifyConfigure() {
  return null;
}
