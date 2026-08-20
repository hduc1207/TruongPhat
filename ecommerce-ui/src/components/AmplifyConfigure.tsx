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
          scopes: ["email", "openid", "showroom-api/read", "showroom-api/write"],
          redirectSignIn: ["https://d26tfxw2msp72q.cloudfront.net", "http://localhost:3000"],
          redirectSignOut: ["https://d26tfxw2msp72q.cloudfront.net", "http://localhost:3000"],
          responseType: "code",
        },
      },
    },
  },
});

export default function AmplifyConfigure() {
  return null;
}
