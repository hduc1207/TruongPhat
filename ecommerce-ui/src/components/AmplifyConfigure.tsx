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
          redirectSignIn: ["https://d26tfxw2msp72q.cloudfront.net"],
          redirectSignOut: ["https://d26tfxw2msp72q.cloudfront.net"],
          responseType: "code",
        },
      },
    },
  },
});

export default function AmplifyConfigure() {
  return null;
}
